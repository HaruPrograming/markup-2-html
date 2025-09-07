import { useState } from "react";
import { marked } from "marked";
import TurndownService from "turndown";

const Top = () => {
  const [ markdownValue, setMarkdownValue ] = useState("");
  const [ htmlValue, setHtmlValue ] = useState("");
  const [ showMenu, setShowMenu ] = useState(0);

  const rules = [
    { regex: /!!(.*?)!!/g, replace: "<span class='text-red-500'>$1</span>" },
    { regex: /@@(.*?)@@/g, replace: "<span class='bg-yellow-300'>$1</span>" },
    {
      regex: /##(.*?)##/g,
      replace: "<span class='text-blue-500 font-bold'>$1</span>",
    },
  ];

  const parseCustomMarkdown = (text) => {
    return rules.reduce(
      (acc, rule) => acc.replace(rule.regex, rule.replace),
      text
    );
  }

  const MarkdownToHtml = (text) => {
    const html = parseCustomMarkdown(text);
    return marked(html);
  }

  const HtmlToMarkdown = (html) => {
    const turndownService = new TurndownService({headingStyle: "atx",});
    return turndownService.turndown(html);
  }

  const styles = {
    previewScreenHeight: {
      height: "95vh",
    },
    makeScreenHeight: {
      height: "90vh",
    },
    headerContents:
      "p-1 m-1 border-2 rounded-sm border-blue-600 bg-blue-200 hover:bg-blue-300",
  };

  return (
    <>
      <div id="layout" className="flex">
        <div
          id="preview"
          className="prose p-1 m-2 w-1/2 border-3 border-blue-600 rounded-sm"
          style={styles.previewScreenHeight}
          dangerouslySetInnerHTML={{ __html: htmlValue }}
        >
        </div>
        <div id="make_screen" className="w-1/2">
          <div id="make_header" className="flex">
            <h1 id="site_title" className="text-2xl">
              Convert
            </h1>
            <div id="menu_bar" className="ml-auto">
              <input
                type="button"
                value={"markdown"}
                id="change_markup"
                className={styles.headerContents}
                onClick={() => setShowMenu(0)}
              />
              <input
                type="button"
                value={"HTML"}
                id="change_html"
                className={styles.headerContents}
                onClick={() => setShowMenu(1)}
              />
              <input
                type="button"
                value={"カスタム"}
                id="custom_markdown"
                className={styles.headerContents}
                onClick={() => setShowMenu(2)}
              />
            </div>
          </div>
          <div
            id="markdown_screen"
            className="m-2 bg-gray-300 rounded-sm"
            style={styles.makeScreenHeight}
          >
            {showMenu == 0 && (
              <textarea
                type="text"
                className="w-full h-full resize-none"
                value={markdownValue}
                onChange={(e) => {
                  setMarkdownValue(e.target.value),
                    setHtmlValue(MarkdownToHtml(e.target.value));
                }}
                placeholder="ここにMarkdownを入力してください"
              />
            )}
            {showMenu == 1 && (
              <textarea
                type="text"
                className="w-full h-full resize-none"
                value={htmlValue}
                onChange={(e) => {
                  setHtmlValue(e.target.value),
                    setMarkdownValue(HtmlToMarkdown(e.target.value));
                }}
                placeholder="ここにhtmlを入力してください"
              />
            )}
            {showMenu == 2 && (
              <textarea
                type="text"
                className="w-full h-full resize-none"
                // value={htmlValue}
                // onChange={(e) => {
                //   setHtmlValue(e.target.value),
                //     setMarkdownValue(HtmlToMarkdown(e.target.value));
                // }}
                placeholder="ここにcustomMarkdownを入力してください"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Top;
