import React, { useEffect, useState } from 'react'
import config from './config'

type GiphyResponseDataType = any // todo: ?

function parseImageFromData({ data }: { data: GiphyResponseDataType }) {
    const src = data?.images?.downsized_large?.url ?? '';
    console.log('[parseImageFromData]', src)
    return src;
}

export default function Root() {

    const [image, setImage] = useState('')
    const [degrees, setDegrees] = useState(0)

    const handleClick = () => {
        setDegrees((degrees + 90) % 360)
    }

    useEffect(() => {

        (async () => {
            try {

                console.log('[useEffect]', 'fetching url:', config.url)
                const response = await fetch(config.url)

                if (response.ok) {
                    const newImage = parseImageFromData(await response.json())
                    setImage(newImage)
                } else {
                    console.log('[useEffect]', 'response not ok', response)
                }
            } catch (error) {
                console.error('[useEffect]', error)
            }


        })()

    }, [setImage])


    return (
        <main>
            <section className="page">
                <article style={{ transform: `rotate(${degrees}deg)` }} onClick={handleClick}>
                    <img src={image} style={{ width: '100%', height: 'auto' }} alt="" />
                </article>
            </section>
        </main>
    )
}
