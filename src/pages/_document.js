import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../utils/create-emotion-cache'
import DynamicFavicon from '../components/favicon/DynamicFavicon'

class CustomDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Rubik:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    />
                    {/*<link*/}
                    {/*    rel="stylesheet"*/}
                    {/*    href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=optional"*/}
                    {/*/>*/}

                    <meta name="theme-color" content="#111827" />
                    <script
                        type="application/javascript"
                        src="https://accounts.google.com/gsi/client"
                        async
                    />
                    {/*<script*/}
                    {/*    async*/}
                    {/*    defer*/}
                    {/*    crossOrigin="anonymous"*/}
                    {/*    src="https://connect.facebook.net/en_US/sdk.js"*/}
                    {/*/>*/}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

CustomDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) =>
                <App emotionCache={cache} {...props} />,
        })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ))

    return {
        ...initialProps,
        styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
    }
}

export default CustomDocument
