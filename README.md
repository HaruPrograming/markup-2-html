# markup-2-html

## 手順
1. clone
- `git clone githubのURL`

2. pull
- `git pull`

3. tailwind install
- `npm install -D @tailwindcss/postcss autoprefixer`
変更点
@tailwind base;
@tailwind components;
@tailwind utilities;
　↓
@import "tailwindcss";

npm install marked
npm install @tailwindcss/typography
 ↓
@plugin "@tailwindcss/typography";




<!--
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              ul: ({ ...props }) => (
                <ul className="list-disc pl-6" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal pl-6" {...props} />
              ),
              h1: ({ ...props }) => (
                <h1 className="text-2xl font-bold my-4" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="text-xl font-bold my-4" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-lg font-bold my-4" {...props} />
              ),
            }}
          >
 -->