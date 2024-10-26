import { Box, CssVarsProvider } from '@mui/joy'
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import React from 'react'

export const EventsMap = () => {
    const center = [55.76, 37.64];

    const images = [...Array(26)].map((n, i) => {
        const letter = String.fromCharCode(i + 97);
        return `https://img.icons8.com/ios-filled/2x/marker-${letter}.png`;
      });

    return (
        <CssVarsProvider>
            <Box>
                <YMaps query={{ load: "package.full" }}>
                    <Map
                        state={{
                            center,
                            zoom: 9,
                            controls: []
                        }}
                        width="100vw"
                        height="100vh"
                    >
                        {images.map((url) => (
                            <Placemark
                                key={url}
                                geometry={center.map((centerCoordinate) => centerCoordinate + (Math.random() - 0.5))}
                                options={{
                                    iconLayout: "default#image",
                                    iconImageSize: [50, 50],
                                    iconImageHref: url
                                }}
                            />
                        ))}
                    </Map>
                </YMaps>
            </Box>
        </CssVarsProvider>
    )
}