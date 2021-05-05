import { useEffect, useState } from 'react';

// useStateでdimensionsの状態を管理する。
// resizeされたらdimensionsの値を変更するようイベントハンドラを設置する

const defaultDimensions = { width: 0, height: 0 }

const useDimensions = (targetRef) => {
    let [dimensions, setDimensions] = useState(defaultDimensions);
    const node = targetRef.current;
    const updateDimensions = (node) => {
    return node === null
    ? defaultDimensions
    : {
        width: node.offsetWidth,
        height: node.offsetHeight,
    };
    }

    useEffect(() => {
        const resizeDimensions = () => {
            setDimensions(updateDimensions(node))
        };
        window.removeEventListener('resize', resizeDimensions);
        window.addEventListener('resize', resizeDimensions);
    });

    dimensions = updateDimensions(node);
    return dimensions;
};

export default useDimensions;