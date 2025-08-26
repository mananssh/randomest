"use client";

interface Props {
    code: string;
}

export default function DynamicRenderer({ code }: Props) {
    return (
        <iframe
            srcDoc={`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
          </head>
          <body>
            <div id="root"></div>
            <script type="module">
              import React from "https://esm.sh/react";
              import ReactDOM from "https://esm.sh/react-dom";

              ${code}

              ReactDOM.createRoot(document.getElementById("root"))
                .render(React.createElement(HomePage));
            </script>
          </body>
        </html>
      `}
            className="w-full h-[600px] border rounded"
        />
    );
}
