// import React, { useState, useRef } from 'react';
// import { List, Avatar } from '@douyinfe/semi-ui';
// import { InfiniteLoader, AutoSizer } from 'react-virtualized';
// import VList from 'react-virtualized/dist/commonjs/List';
// import fakeData from "../Json/profile.json";
//
// const VirtualizedScrollList = ({ height = 500 }) => {
//
//     const requestProfile = new Promise((resolve, reject) => {
//         // 随机生成成功或失败
//         let isSuccessful = Math.random() >= 0.5;
//
//         if (isSuccessful) {
//             // 成功时，调用resolve
//             resolve(fakeData);
//         } else {
//             // 失败时，调用resolve，并返回错误消息和代码
//             resolve({ msg: '密码错误', code: 1001 });
//         }
//     });
//
//     const [dataSource, setDataSource] = useState([]);
//     const loadedRowsMapRef = useRef({});
//     const loadingRowCountRef = useRef(0);
//
//     const statusLoading = 0;
//     const statusLoaded = 1;
//     const loadLimit = fakeData.data.length;
//
//     const fetchData = (startIndex, stopIndex) => {
//         return new Promise((res) => {
//             setTimeout(() => {
//
//             }, 1000);
//         }).then((newData) => {
//             let updatedData = [...dataSource];
//             const increment = stopIndex - startIndex + 1;
//
//             for (let i = startIndex; i <= stopIndex; i++) {
//                 loadedRowsMapRef.current[i] = statusLoaded;
//             }
//
//             setDataSource(updatedData);
//             loadedRowsMapRef.current = { ...loadedRowsMapRef.current };
//             loadingRowCountRef.current -= increment;
//         });
//     };
//
//     const handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
//         const increment = stopIndex - startIndex + 1;
//         if (stopIndex >= loadLimit || loadingRowCountRef.current > 0) {
//             return;
//         }
//
//         for (let i = startIndex; i <= stopIndex; i++) {
//             loadedRowsMapRef.current[i] = statusLoading;
//         }
//
//         loadingRowCountRef.current += increment;
//
//         return fetchData(startIndex, stopIndex);
//     };
//
//     const isRowLoaded = ({ index }) => !!loadedRowsMapRef.current[index];
//
//     const renderItem = ({ index, key, style }) => {
//         const item = dataSource[index];
//
//         if (!item) {
//             return null;
//         }
//
//         return (
//             <List.Item
//                 key={key}
//                 style={style}
//                 header={<Avatar color={item.color}>SE</Avatar>}
//                 main={
//                     <div>
//                         <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.title}</span>
//                         <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
//                             Semi Design
//                             设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
//                             Web 应用。
//                         </p>
//                     </div>
//                 }
//             />
//         );
//     };
//
//     return (
//         <List style={{ border: '1px solid var(--semi-color-border)', padding: 10 }}>
//             <InfiniteLoader
//                 isRowLoaded={isRowLoaded}
//                 loadMoreRows={handleInfiniteOnLoad}
//                 rowCount={loadLimit}
//             >
//                 {({ onRowsRendered, registerChild }) => (
//                     <AutoSizer disableHeight>
//                         {({ width }) => (
//                             <VList
//                                 ref={registerChild}
//                                 height={height}
//                                 onRowsRendered={onRowsRendered}
//                                 rowCount={loadLimit}
//                                 rowHeight={118}
//                                 rowRenderer={renderItem}
//                                 width={width}
//                             />
//                         )}
//                     </AutoSizer>
//                 )}
//             </InfiniteLoader>
//         </List>
//     );
// };
//
// export default VirtualizedScrollList;
