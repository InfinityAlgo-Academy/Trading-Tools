import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>
          Created by <strong>InfinityAlgo</strong> By: King Arius (Ar hafsi) © 2020-{year}
        </p>
        <ul>
          <li><a href="https://github.com/InfinityAlgo-Academy">GitHub</a></li>
          <li><a href="https://t.me/InfinityAlgo_Group_Topics">Telegram</a></li>
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
