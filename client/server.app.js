import React from 'react';
import App from './App.js';
import { StaticRouter } from "react-router-dom";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import stats from "../dist/react-loadable.json";
const E = (props)=><StaticRouter {...props}><App /></StaticRouter>;
export default E;
// export const ssrMiddleWare=(app)=>{
//   Loadable.preloadAll().then(() => {
//     app.get('/', (req, res,next) => {
//       let modules = [];

//       let html = ReactDOMServer.renderToString(
//         <Loadable.Capture report={moduleName => modules.push(moduleName)}>
//           <E context={{}} location={req.url}/>
//         </Loadable.Capture>
//       );
//       let bundles = getBundles(stats, modules);
//       console.log('ssrMiddleWare',modules,html);
//       const ss=bundles.map(bundle=>`bundle.file`)
//       console.log('bundles')
//       next()
//       // res.send(`...${html}...`);
//     });
//   });
// }