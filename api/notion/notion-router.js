const router = require('express').Router();
const client_1 = require('@notionhq/client');
const { v4: uuidv4 } = require('uuid');

// const port = 8000;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

// Initializing the Notion client with secret
const notion = new client_1.Client({
    auth: notionSecret,
  });

if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

router.post('/', (req, res) => {
    async function addPage(pageTitle, emoji, coverUrl, selection, content) {
      try {
         const response = await notion.pages.create({
          parent: { database_id: notionDatabaseId || '994c24e36390405dbb3a69c044596817' },
          icon: {
            type: "emoji",
            emoji: emoji || "🎟",
          },
          cover: {
            type: "external",
            external: {
              url: coverUrl || "https://media-exp1.licdn.com/dms/image/C561BAQFay3fkJQSiSQ/company-background_10000/0/1625055581380?e=2159024400&v=beta&t=jLIPaFBM9OCNcv0C36lHm2VuQ1FRhYwY06Z5hwD9PO4",
            },
          },
          properties: {
            title: { 
              title:[
                {
                  "text": {
                    "content": pageTitle               
                  }
                }
              ]
            },
  
            Type: {
              type: 'select',
              select: {
                name: selection || 'Not Specified'
              }
            },
  
          },
          
  
          children: [
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [
                  {
                    type: 'text',
                    text: {
                      content: content || 'No page content specified.'
                    },
                  }
                ],
              },
            }
          ]
  
        })
        console.log(response)
        console.log("Success! Entry added.")
        res.json(`Page Created! ${response}`)
      } catch (error) {
        console.error(error)
      }
    }
  
    addPage(
      req.body.page.pageTitle, 
      req.body.page.emoji, 
      req.body.page.cover,
      req.body.page.selection,
      req.body.page.content
    );
  
  })

  module.exports = router;