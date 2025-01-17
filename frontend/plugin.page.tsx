import { addPage, NamedPage } from '@hydrooj/ui-default'
import $ from 'jquery'
/**
 * 将难度数字转化为标签形式
 * @param {number} difficulty 难度 
 * @returns {string} 转化后的
 */
function translateDifficult(difficulty: number): string {
    if (difficulty < 0 || difficulty > 10) {
        throw new Error(`Invalid difficulty value ${difficulty},should between 1 and 10.`);
    }
    switch (difficulty) {
        case 1:
            return '<span style="background-color: rgb(254, 76, 97);color: white">入门</span>';
        case 2:
            return '<span style="background-color: rgb(243, 156, 17);color: white">普及-</span>';
        case 3:
            return '<span style="background-color: rgb(255, 193, 22);color: white">普及/提高-</span>';
        case 4:
            return '<span style="background-color: rgb(82, 196, 26);color: white">普及+/提高</span>';
        case 5:
            return '<span style="background-color: rgb(52, 152, 219);color: white">提高+/省选-</span>';
        case 6:
            return '<span style="background-color: rgb(157, 61, 207);color: white">省选/NOI-</span>';
        case 7: default:
            return '<span style="background-color: rgb(14, 29, 105);color: white">NOI/NOI+</span>';
    }
}
addPage(new NamedPage(["problem_main"],
    () => {
        // 加入样式表
        $("head").append(`
            <style>.col--difficulty { width: 6.375rem !important;
            text-overflow:clip; }</style>
            <style>
            .col--difficulty span {
    display: inline-block;
    padding: 0 8px;
    box-sizing: border-box;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 2px;
}
            </style>
            <link rel="stylesheet" href="https://unpkg.com/mdui@2/mdui.css">
<script src="https://unpkg.com/mdui@2/mdui.global.js"></script>
            `);

        function t(s: Document) {
            for (let e of Array.from(s.querySelectorAll("td.col--difficulty"))) {
                //  无           暂无评定
                if (["(\u65E0)", "\u6682\u65E0\u8BC4\u5B9A"].includes($(e).text())) {
                    $(e).html('<span style="background-color: rgb(191, 191, 191);">\u6682\u65E0\u8BC4\u5B9A</span>');
                }
                let difficulty = +$(e).text();
                $(e).html(translateDifficult(difficulty));
            }
        }
        $(document).on("vjContentNew", s => t(s.target)),
            t(document)
    }));


addPage(new NamedPage(["problem_detail"], () => {
    $("head").append(`
            <style>
            #difficult-block span {
    display: inline-block;
    padding: 0 8px;
    box-sizing: border-box;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 2px;
}
            </style>
             `); for (let t of Array.from(document.getElementsByClassName("problem__tag-item"))) {
        let s = $(t).text();
        if (s.startsWith("\u96BE\u5EA6: ")) {
            let e = +s.split(": ")[1];
            $(t).html(`<div id="difficult-block">` + translateDifficult(e) + `</div>`);
        }
    }
}));
