import {useEffect} from "react";

useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, [])

function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        // 加载更多数据
        loadMoreData();
    }
}