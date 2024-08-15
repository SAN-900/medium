import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { blogInputs, updateBlogInputs } from '@saan45/zod'

export const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables:{
    userId: any,
  prisma: any
  }
}>()


bookRouter.use('/*', async (c, next) => {
const header = c.req.header("authorization") || "";
const token = header.split(" ")[1]
try{
const res = await verify(token, c.env.JWT_SECRET) 
if(!res){
   c.status(403)
     return c.json({
      error: "You are not logged in"
     })
}
  c.set('userId', res.id)
  await next()
  }
  catch(e){
      c.status(411)
      return c.json({msg: "login again"})
    }
  }
)

bookRouter.use('/*', async (c, next) => {
	const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set('prisma', prisma);
  await next();
})


bookRouter.post('/blog', async(c) => {
  const prisma = c.get('prisma');
  const body = await c.req.json();
  const userId = c.get('userId');
  const { success } = blogInputs.safeParse(body);
  if(!success){
    c.status(403)
    return c.json({
        msg: "incorrect credentials"
    })
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId 
    }
  })
	if(!post){
        c.status(403)
        return c.json({
		msg: "something went wrong"
	});
    }
    return c.json({
		id: post.id
	});
})

bookRouter.put('/blog', async (c) => {
    const prisma = c.get('prisma');
    const userId = c.get('userId')
    const body = await c.req.json();
    const { success } = updateBlogInputs.safeParse(body);
  if(!success){
    c.status(403)
    return c.json({
        msg: "incorrect credentials"
    })
  }
    const updatePost = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
	return c.text('posts updated')
})

bookRouter.get('blog/bulk', async (c) => {
	const prisma = c.get('prisma');
    const posts = await prisma.post.findMany({
     select: {
      title: true,
      content: true,
      id: true,
      author:{
        select:{
          name: true
        }
      }
     } 
    })
	return c.json(posts)
})

bookRouter.get('blog/:id', async (c) => {
	const id = parseInt(c.req.param('id'))
	const prisma = c.get('prisma');
    const posts = await prisma.post.findUnique({
        where: {
            id
        },
        select: {
          title: true,
          content: true,
          author: {
            select:{
              name: true
            }
          }
        }
    })
	return c.json(posts)
})

