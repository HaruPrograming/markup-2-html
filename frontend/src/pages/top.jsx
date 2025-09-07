import { useEffect, useState } from "react";
import { marked } from "marked";
import TurndownService from "turndown";
import { fetchMarkdownItems } from "../api/api.js";

const Top = () => {
  const [ markdownValue, setMarkdownValue ] = useState("");
  const [ htmlValue, setHtmlValue ] = useState("");
  const [showMenu, setShowMenu] = useState(0);
  const [ rulesData, setRulesData ] = useState([""]);

  useEffect(() => {
    fetchMarkdownItems().then((data) => {
      // data が配列なら map して rulesData を配列に変換
      const rules = data.map((item) => ({
        regex: new RegExp(`${item.regex}(.*?)${item.regex}`, "g"),
        replace: item.replace,
      }));
      setRulesData(rules);
    });
  }, []);

  const parseCustomMarkdown = (text) => {
    return rulesData.reduce(
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
      <div id="layout" className="flex w-screen">
        <div
          id="preview"
          className="prose p-1 m-2 w-screen border-3 border-blue-600 rounded-sm"
          style={styles.previewScreenHeight}
          dangerouslySetInnerHTML={{ __html: htmlValue }}
        ></div>
        <div id="make_screen" className="w-screen">
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
                value={"custom"}
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
              <>
                {/* <textarea
                  type="text"
                  className="w-full h-full resize-none"
                  // value={htmlValue}
                  // onChange={(e) => {
                  //   setHtmlValue(e.target.value),
                  //     setMarkdownValue(HtmlToMarkown(e.target.value));
                  // }}
                  placeholder="ここにcustomMarkdownを入力してください"
                /> */}
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-1">customMarkDown</th>
                      <th className="p-1">htmlCode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rulesData.map((rule, index) => (
                      <tr key={index}>
                        <td className="p-1 border-r-2">
                          <input type="text" value={`${rule.regex}`} className="w-full" />
                        </td>
                        <td className="p-1"><input type="text" value={rule.replace} className="w-full" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <input type="submit" value={"保存"} className="py-1 px-2 m-1 float-end rounded-sm bg-amber-400" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Top;
