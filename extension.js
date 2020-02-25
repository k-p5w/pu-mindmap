const vscode = require('vscode');

// キーバインド想定：
// editorTextFocus && !editorReadonly && !editorTabMovesFocus && editorLangId == 'diagram'

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('welcome to mindmap.');
    context.subscriptions.push(vscode.commands.registerCommand('extension.mindmapincrement', mindmapincrement));
    context.subscriptions.push(vscode.commands.registerCommand('extension.mindmapdecrement', mindmapdecrement));
}
exports.activate = activate;

// IsTagert is 処理対象かチェックする
function IsTagert() {
    // editorじゃないとき
    if (!vscode.window.activeTextEditor) {
        return false; // no editor
    }

    // アクティブなエディタを取得
    const editor = vscode.window.activeTextEditor;

    // 選択範囲がされていない場合
    if (editor.selection.isEmpty) {
        // なにもしない
        console.log('範囲選択なし.');
        return false;

    } else {

        return true;
    }
}


function mindmapdecrement() {
    console.log("mindmapdecrement");
    // 対象外の場合
    if (!IsTagert()) {
        return;
    }
    // アクティブなエディタを取得
    const editor = vscode.window.activeTextEditor;
    //選択範囲を取得
    const ref = editor.selection;
    // 選択された文字列を取得する
    const selectedtxt = editor.document.getText(ref);

    // 改行で分割する
    var repstr = selectedtxt.replace("\r\n", "\n");
    var splitStrObj = repstr.split("\n");

    var newref = "";
    for (var i = 0; i < splitStrObj.length; i++) {
        var newtext = splitStrObj[i];

        console.log("getNewStringを呼び出すよ");
        var updtext = getNewString(newtext, false);

        // 初回文字だと、置き換えで、2件目以降は追加してく。
        if (newref.length == 0) {
            newref = updtext;
        } else {
            newref = newref + "\n" + updtext;
        }


    }
    // editorに反映させる
    editor.edit(builder => {
        builder.replace(ref, newref)
    })

    return [];

}

function mindmapincrement() {
    console.log("mindmapincrement");
    // 対象外の場合
    if (!IsTagert()) {
        return;
    }

    // アクティブなエディタを取得
    const editor = vscode.window.activeTextEditor;

    //選択範囲を取得
    const ref = editor.selection;


    // 選択された文字列を取得する
    const selectedtxt = editor.document.getText(ref);

    // 改行を統一し、分解
    var repstr = selectedtxt.replace("\r\n", "\n");
    var splitStrObj = repstr.split("\n");

    var newref = "";
    // 選択行分繰り返し
    for (var i = 0; i < splitStrObj.length; i++) {
        var newtext = splitStrObj[i];

        console.log("getNewStringを呼び出すよ");
        var updtext = getNewString(newtext, true);

        // 初回文字だと、置き換えで、2件目以降は追加してく。
        if (newref.length == 0) {
            newref = updtext;
        } else {
            newref = newref + "\n" + updtext;
        }


    }
    // editorに反映させる
    editor.edit(builder => {
        builder.replace(ref, newref)
    })

    return [];

}


/**
 * @param {string} newtext
 */
function getNewString(newtext, goRight) {
    console.log("getNewString-start!");
    console.log(newtext);

    var selectedtxt = newtext;

    // 1文字目を取り出す
    var srcword = newtext.substring(0, 1);

    var IsKeyWord = false;

    const regex = RegExp(`[\\+|\\-|\*|']`);
    console.log("今回の選択文字：", srcword);
    // 予約語ではじまっているか？
    IsKeyWord = regex.test(srcword);

    // todo:1文字目から分のはじまりまでを取得する。。

    // 1-1-1.開始文字が plantumlで使う予約語？（[+|-|*|']）の場合
    if (IsKeyWord) {
        console.log('予約語でした.');

        // チェック用文字列の準備
        const regexplus = RegExp("\\+");
        const regminus = RegExp("\\-");
        var IsPlusstr = false;


        IsPlusstr = regexplus.test(srcword);

        var IsMinusstr = false;
        IsMinusstr = regminus.test(srcword);

        if (IsPlusstr) {
            // 1-1-1-a.+ の場合		

            // + 文字であればスペースなしで+だけを増やす
            console.log('予約語＋でした.');
            // - 開始文字の前に、[+]を追加する

            // 右に行く場合
            if (goRight) {
                newtext = "+" + selectedtxt;
            } else {
                // - を1つ消す。
                var endpos = selectedtxt.length;
                newtext = selectedtxt.substring(1, endpos);

            }


        } else if (IsMinusstr) {
            console.log('予約語－でした.');

            // 右に行く場合
            if (goRight) {
                // - マイナスを1つ消す。
                var endpos = selectedtxt.length;
                newtext = selectedtxt.substring(1, endpos);
            } else {
                newtext = "-" + selectedtxt;
            }
            // 1-1-1-b.- の場合


        } else {
            console.log('予約語＠その他でした.');
            // 1-1-1-c.* の場青
            // - なにもしない
        }

    } else {
        // 1-1-2.上記以外の場合
        console.log('予約語以外でした.');


        // 右に行く場合
        if (goRight) {
            newtext = "+ " + selectedtxt;
        } else {
            newtext = "- " + selectedtxt;
        }
    }
    return newtext;

}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}