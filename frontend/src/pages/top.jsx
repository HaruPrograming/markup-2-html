import { useEffect, useState } from "react";
import { marked } from "marked";
import TurndownService from "turndown";
// import DOMPurify from "dompurify";
import {
  fetchMarkdownItems,
  CreateMarkdownItem, updateMarkdownItem,
} from "../api/api.js";

const Top = () => {
  const [markdownValue, setMarkdownValue] = useState();
  const [htmlValue, setHtmlValue] = useState();
  const [showMenu, setShowMenu] = useState(0);
  const [rulesData, setRulesData] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [newInputValue, setNewInputValue] = useState({ regex: "", replace: "" });

  useEffect(() => {
    fetchMarkdownItems().then((data) => {
      const rules = data.map((item) => ({
        id: item.id,
        regex: new RegExp(`${item.regex}(.*?)${item.regex}`, "g"),
        replace: (item.replace).replace("><", ">$1<"),
      }));
      setRulesData(rules);
    });
  }, []);

  useEffect(() => {
    // inputValue も同じ形で初期化
    fetchMarkdownItems().then((data) => {
        const initInput = data.map((item) => ({
          id: item.id,
          regex: item.regex,
          replace: item.replace,
        }));
      setInputValue(initInput);
    });
  }, [newInputValue]);

  const parseCustomMarkdown = (text) => {
    return rulesData.reduce(
      (acc, rule) => acc.replace(rule.regex, rule.replace),
      text
    );
  };

  const MarkdownToHtml = (text) => {
    const html = parseCustomMarkdown(text);
    return marked(html);
  };

  const HtmlToMarkdown = (html) => {
    const turndownService = new TurndownService({ headingStyle: "atx" });
    return turndownService.turndown(html);
  };

  const ChangeValue = (e, value, inputId) => {
    setInputValue((prev) =>
      prev.map((item) =>
        item.id === inputId
          ? value === "regex"
            ? {
                ...item,
                id: inputId,
                regex: e.target.value,
              }
            : {
                ...item,
                id: inputId,
                replace: e.target.value,
              }
          : item
      )
    );
  };

  const CreateValue = (e, value) => {
    setInputValue((prev) => [
      ...prev,
      value === "regex"
        ? { id: prev.length + 1, regex: e.target.value, replace: "" }
        : { id: prev.length + 1, regex: "", replace: e.target.value },
    ]);
  };

  // SaveMarkdown 内の更新処理
  const SaveMarkdown = () => {
    if (newInputValue.regex && newInputValue.replace) {
      CreateMarkdownItem(newInputValue)
        .then(() => {
          setInputValue((prev) => [
            ...prev,
            {
              regex: newInputValue.regex,
              replace: newInputValue.replace,
            },
          ]);
          setNewInputValue({ regex: "", replace: "" }); // 追加後に入力フィールドをクリア
        })
        .catch((error) => {
          console.error("Error creating item:", error);
        });
    }

    inputValue.map((item) => {
      updateMarkdownItem(item.id, {
        regex: item.regex || "", // RegExp を文字列に変換
        replace: item.replace || "",
      });
    });
  };

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
          className="prose prose-h1:my-3 prose-h2:my-2 prose-h3:my-1 max-w-none w-3/4 p-1 m-2 border-3 border-blue-600 rounded-sm"
          style={styles.previewScreenHeight}
          dangerouslySetInnerHTML={{ __html: htmlValue }}
          // dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlValue) }}
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
                    {inputValue.map((value) => (
                      <tr>
                        <td className="p-1 border-r-2">
                          <input
                            type="text"
                            defaultValue={value.regex}
                            onChange={(e) => {
                              ChangeValue(e, "regex", value.id);
                            }}
                            className="w-full"
                          />
                        </td>
                        <td className="p-1">
                          <input
                            type="text"
                            defaultValue={value.replace}
                            className="w-full"
                            onChange={(e) => {
                              ChangeValue(e, "replace", value.id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="p-1 border-r-2">
                        <input
                          type="text"
                          placeholder="新しいmarkdownを入力"
                          value={newInputValue.regex}
                          onChange={(e) => {
                            setNewInputValue((prev) => ({ ...prev, regex: e.target.value }));
                          }}
                          className="w-full"
                          />
                      </td>
                      <td className="p-1">
                        <input
                          type="text"
                          placeholder="新しいhtmlを入力"
                          value={newInputValue.replace}
                          className="w-full"
                          onChange={(e) => {
                            setNewInputValue((prev) => ({ ...prev, replace: e.target.value }))  ;
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <input
                  type="button"
                  value={"保存"}
                  className="py-1 px-2 m-1 float-end rounded-sm bg-amber-400"
                  onClick={SaveMarkdown}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Top;
