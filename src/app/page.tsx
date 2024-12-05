'use client';

import * as fabric from 'fabric';
import { useCallback, useRef } from 'react';
import Canvas from './components/Canvas';

const tokenScreenshot = {
  mcapVolatility: -5.69,
  mcap: '$3.9M',
  vol24h: '$282K',
  liquidity: '$565K',
  tokenName: 'Bitcat',
  tokenIcon:
    'https://dd.dexscreener.com/ds-data/tokens/solana/4j9bDg7iWNah1Qa61rrqwWZMtEdqV3fV56SzyhfNpump/header.png?size=xl&key=021bbf',
  tokenSymbol: 'BITCAT',
};

const centerGroup = (...elements: (fabric.FabricText | fabric.Group)[]) => {
  const maxWidth = Math.max(...elements.map((element) => element.width));
  elements.forEach((element) => {
    element.left = (maxWidth - element.width) / 2;
  });
};

export default function Home() {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const onLoad = useCallback(async (canvas: fabric.Canvas) => {
    canvas.setDimensions({
      width: 1161,
      height: 610,
    });
    canvas.backgroundColor = 'black';

    // BANNER
    const img = await fabric.FabricImage.fromURL(
      'https://dd.dexscreener.com/ds-data/tokens/solana/4j9bDg7iWNah1Qa61rrqwWZMtEdqV3fV56SzyhfNpump/header.png?size=xl&key=021bbf',
    );
    img.set({
      left: 0,
      top: 0,
      angle: 0,
    });
    img.scaleToWidth(1161);
    canvas.add(img);

    // ICON
    const icon = await fabric.FabricImage.fromURL(
      'https://dd.dexscreener.com/ds-data/tokens/solana/4j9bDg7iWNah1Qa61rrqwWZMtEdqV3fV56SzyhfNpump.png?size=lg&key=021bbf',
    );
    icon.scaleToWidth(200);
    icon.set({
      left: 0,
      top: 0,
      clipPath: new fabric.Circle({
        radius: 128,
        originX: 'center',
        originY: 'center',
        left: 0,
        top: 0,
      }),
      objectCaching: false, // Disable object caching to get a smoother appearance with border
    });
    const circleBorder = new fabric.Circle({
      radius: 110, // Slightly larger radius to create a border effect
      fill: 'transparent', // Make the circle transparent
      stroke: 'black', // Border color
      strokeWidth: 10, // Border width
      originX: 'center', // Center the circle
      originY: 'center', // Center the circle
      left: 100, // Center the border on the canvas
      top: 100, // Center the border on the canvas
    });
    circleBorder.scaleToWidth(200);
    const iconGroup = new fabric.Group([icon, circleBorder]);

    const tokenSymbolText = new fabric.FabricText(tokenScreenshot.tokenSymbol, {
      left: 50,
      top: 0,
      fontFamily: 'Arial',
      fontSize: 32,
      fontWeight: 'bold',
      fill: '#FFFFFF',
    });

    const tokenNameText = new fabric.FabricText(tokenScreenshot.tokenName, {
      top: tokenSymbolText.height,
      fontFamily: 'Arial',
      fontSize: 32,
      fontWeight: 'bold',
      fill: '#FFFFFF',
    });

    centerGroup(tokenSymbolText, tokenNameText);
    const tokenNameGroup = new fabric.Group([tokenSymbolText, tokenNameText], {
      top: iconGroup.height,
    });

    centerGroup(iconGroup, tokenNameGroup);
    const tokenNameGroupWithIcon = new fabric.Group(
      [iconGroup, tokenNameGroup],
      {
        left: 50,
        top: 260,
      },
    );

    canvas.add(tokenNameGroupWithIcon);

    // MCAP
    const mcapText = new fabric.FabricText('MCAP ', {
      left: 50,
      top: 0,
      fontFamily: 'Arial',
      fontSize: 32,
      fontWeight: 'bold',
      fill: '#9d9d9d',
    });

    const mcapVolatility = new fabric.FabricText(
      tokenScreenshot.mcapVolatility.toString() + '%',
      {
        left: mcapText.left + mcapText.width,
        top: 0,
        fontFamily: 'Arial',
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#FF0000',
      },
    );

    const mcapTextTitleGroup = new fabric.Group([mcapText, mcapVolatility], {
      top: 0,
    });

    const mcapValue = new fabric.FabricText(tokenScreenshot.mcap, {
      top: mcapTextTitleGroup.height,
      fontFamily: 'Arial',
      fontSize: 50,
      fontWeight: 'bold',
      fill: '#FFFFFF',
    });

    centerGroup(mcapTextTitleGroup, mcapValue);
    const mcapGroup = new fabric.Group([mcapTextTitleGroup, mcapValue], {});

    // 24h VOL
    const vol24hText = new fabric.FabricText('24H VOL ', {
      left: 50,
      top: 0,
      fontFamily: 'Arial',
      fontSize: 32,
      fontWeight: 'bold',
      fill: '#9d9d9d',
    });

    const vol24hValue = new fabric.FabricText(tokenScreenshot.vol24h, {
      top: vol24hText.height,
      fontFamily: 'Arial',
      fontSize: 50,
      fontWeight: 'bold',
      fill: '#FFFFFF',
    });

    centerGroup(vol24hText, vol24hValue);
    const vol24hGroup = new fabric.Group([vol24hText, vol24hValue], {
      left: mcapGroup.width + 150,
    });

    // LIQUIDITY
    const liquidityText = new fabric.FabricText('LIQUIDITY ', {
      left: 50,
      top: 0,
      fontFamily: 'Arial',
      fontSize: 32,
      fontWeight: 'bold',
      fill: '#9d9d9d',
    });

    const liquidityValue = new fabric.FabricText(tokenScreenshot.liquidity, {
      top: liquidityText.height,
      fontFamily: 'Arial',
      fontSize: 50,
      fontWeight: 'bold',
      fill: '#FFFFFF',
    });

    centerGroup(liquidityText, liquidityValue);
    const liquidityGroup = new fabric.Group([liquidityText, liquidityValue], {
      left: mcapGroup.width + vol24hGroup.width + 150 * 2,
    });

    const screenShotGroup = new fabric.Group(
      [mcapGroup, vol24hGroup, liquidityGroup],
      {
        top: 450,
      },
    );

    screenShotGroup.set({
      left: canvas.getWidth() - screenShotGroup.width - 50,
    });

    canvas.add(screenShotGroup);

    // const text = new fabric.FabricText('Liquidity', {
    //   originX: 'center',
    //   top: 20,
    //   textAlign: 'center',
    //   fontFamily: 'Inter',
    //   color: 'red',
    //   styles: fabric.util.stylesFromArray(
    //     [
    //       {
    //         style: {
    //           fontWeight: 'bold',
    //           fontSize: 64,
    //         },
    //         start: 0,
    //         end: 9,
    //       },
    //     ],
    //     'Liquidity',
    //   ),
    // });
    // canvas.add(text);

    // const animate = (toState: number) => {
    //   text.animate(
    //     { scaleX: Math.max(toState, 0.1) * 2 },
    //     {
    //       onChange: () => canvas.renderAll(),
    //       onComplete: () => animate(Number(!toState)),
    //       duration: 1000,
    //       easing: toState
    //         ? fabric.util.ease.easeInOutQuad
    //         : fabric.util.ease.easeInOutSine,
    //     },
    //   );
    // };
    // animate(1);

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1.0, // Quality for JPEG format (0.0 - 1.0)
      multiplier: 1,
    });

    console.log(dataURL);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
          Token Screenshot Generator
        </h1>

        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700 text-gray-400 mb-5">
          <p>
            <b>Graphic editors:</b> Fabric.js
          </p>
          <p>
            <b>Interactive UIs:</b> Konva.js
          </p>
          <p>
            <b>Games, heavy visuals:</b> PixiJS
          </p>
          <p>
            Github:{' '}
            <a
              href="https://github.com/fabricjs/fabric.js/blob/1f62cdecd7ec0c1f7caca1ab9273e4b45b87a975/.codesandbox/templates/next/components/Canvas.tsx"
              className="text-purple-400 hover:text-purple-500 transition-colors"
            >
              fabricjs/fabric.js
            </a>
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-gray-200 font-semibold">
                FabricJS Preview
              </h2>
              <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors rounded-md text-white font-medium"
                onClick={() => {
                  if (canvasRef.current) {
                    const dataURL = canvasRef.current.toDataURL({
                      format: 'png',
                      quality: 1.0,
                    });
                    const link = document.createElement('a');
                    link.download = 'token-screenshot.png';
                    link.href = dataURL;
                    link.click();
                  }
                }}
              >
                Download Image
              </button>
            </div>
            <Canvas
              ref={canvasRef}
              onLoad={onLoad}
              className="rounded-lg overflow-hidden"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
