import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupBody, signinBody } from '@saan45/zod'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables:{
    userId: any,
  prisma: any
  }
}>()

userRouter.use('/*', async (c, next) => {
	const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set('prisma', prisma);
  await next();
})

userRouter.post('/signup', async(c) => {
const prisma = c.get('prisma')
const body = await c.req.json();
const { success } = signupBody.safeParse(body);
if(!success){
    c.status(411);
    return c.json({
        msg: "incorrect inputs"
    })
}
const existingUser = await prisma.user.findUnique({
   where: {
    email: body.email
  }
})
if(existingUser){
  c.status(403)
  return c.json({
    msg: "user already exist"
  })
}
const user = await prisma.user.create({
   data: {
    email: body.email,
    password: body.password,
    name: body.name
  }
})
if(user){
     const token = await sign({ id: user.id }, c.env.JWT_SECRET)
     return c.json({
         jwt: token
    })
    }
else{
  c.status(403)
  return c.json({
    msg: "Something went wrong in your inputs"
  })
}
})

userRouter.post('/signin', async(c) => {
	const prisma = c.get('prisma')
const body = await c.req.json();
const { success } = signinBody.safeParse(body);
if(!success){
    c.status(411)
    return c.json({
        msg: "Wrong credentials"
    })
}
const user = await prisma.user.findUnique({
  where: {
    email: body.email,
    password: body.password
  }
});
if(!user){
  c.status(403);
  return c.json({
    msg: 'user not found'
  })
}

const token =  await sign({ id: user.id}, c.env.JWT_SECRET)

return c.json({
  jwt: token
})
})
