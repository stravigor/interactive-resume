import { marked } from 'marked'
import DOMPurify from 'dompurify'

/**
 * Composable for rendering markdown content safely
 */
export function useMarkdown() {

  // Configure marked options
  marked.setOptions({
    breaks: true, // Enable line breaks
    gfm: true, // GitHub Flavored Markdown
    pedantic: false, // Don't be strict about markdown spec
  })

  /**
   * Render markdown to HTML and sanitize it
   * @param content - Markdown content to render
   * @returns Sanitized HTML string
   */
  function renderMarkdown(content: string): string {
    if (!content) return ''

    try {

      // Parse markdown to HTML
      const rawHtml = marked.parse(content) as string

      // Sanitize HTML to prevent XSS attacks
      const cleanHtml = DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre',
          'blockquote', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3',
          'h4', 'h5', 'h6', 'hr', 'table', 'thead', 'tbody', 'tr',
          'th', 'td', 'img'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class'],
        ALLOW_DATA_ATTR: false,
        ADD_ATTR: ['target'], // Allow target attribute for links
        FORCE_BODY: true,
      })
      return cleanHtml
    } catch (error) {
      // Return escaped content as fallback
      return DOMPurify.sanitize(content)
    }
  }

  /**
   * Configure custom renderer for specific elements
   */
  function configureRenderer() {
    const renderer = new marked.Renderer()
    // Add class to code blocks for styling
    renderer.code = ({ text, lang }) => {
      const language = lang || 'plaintext'
      return `<pre class="code-block"><code class="language-${language}">${text}</code></pre>`
    }

    marked.use({ renderer })
  }

  // Configure renderer on initialization
  configureRenderer()

  return {
    renderMarkdown
  }
}