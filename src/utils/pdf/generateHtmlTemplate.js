export default function generateHtmlTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Custom PDF</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .header { text-align: center; margin-bottom: 20px; }
            .content { margin: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${data.title}</h1>
          </div>
          <div class="content">
            <p>${data.content}</p>
          </div>
        </body>
      </html>
    `;
  }
  