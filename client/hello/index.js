import Loadable from 'react-loadable';
import React from 'react';
const AsyncHello = Loadable({
    loading: <div>loading...</div>,
    //把你的Hello组件写到单独的文件中
    //然后使用webpack的 dynamic import
    loader: () => import('./Hello'),
})
export default AsyncHello;