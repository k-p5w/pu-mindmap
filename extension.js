// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    console.log('welcome to mindmap.');

    // mindmapincrement is カーソル位置が先頭であれば、先頭文字を確認し、[+|-|*]以外であれば[+]を追加する。
    let disposable = vscode.commands.registerCommand('extension.mindmap.increment', function() {
        // 以下エントリを参考に実装してみる
        // https://qiita.com/delmontz/items/abd075eacb1302fc184c

        if (!vscode.window.activeTextEditor) {
            return; // no editor
        }
        var newtext = "";
        // アクティブなエディタを取得
        const editor = vscode.window.activeTextEditor;

        //選択範囲を取得
        const ref = editor.selection;

        // 選択範囲がされていない場合
        if (editor.selection.isEmpty) {
            console.log('範囲選択なし.');
            // var startPos = editor.document.positionAt(0);
            // var endPos = editor.document.positionAt(editor.document.getText().length - 1);
            // var range = new vscode.Range(startPos, endPos);
            var IsPos0 = false;
            // 1-1.カーソル位置が先頭の場合
            if (IsPos0) {

            } else {
                // 1-2.上記以外
                // 選択されていれば選択範囲の先頭文字に対して同様の処理を行う

            }

        } else {

            // 選択範囲あり

            // 選択された文字列を取得する
            const selectedtxt = editor.document.getText(ref);
            newtext = selectedtxt;
            console.log(selectedtxt);
            var srcword = selectedtxt.substring(0, 1);

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
                var IsMapLeft = false;

                IsMapLeft = regexplus.test(srcword);

                var IsMapRight = false;
                IsMapRight = regminus.test(srcword);
                console.log(IsMapLeft);
                console.log(IsMapRight);
                if (IsMapLeft) {
                    // 1-1-1-a.+ の場合		

                    // + 文字であればスペースなしで+だけを増やす
                    console.log('予約語＋でした.');
                    // - 開始文字の前に、[+]を追加する
                    newtext = "+" + selectedtxt;

                } else if (IsMapRight) {
                    console.log('予約語－でした.');
                    // 1-1-1-b.- の場合
                    // - マイナスを1つ消す。
                    var endpos = selectedtxt.length;
                    newtext = selectedtxt.substring(1, endpos);

                } else {
                    console.log('予約語＠その他でした.');
                    // 1-1-1-c.* の場青
                    // - なにもしない
                }

            } else {
                // 1-1-2.上記以外の場合
                console.log('予約語以外でした.');
                newtext = "+ " + selectedtxt;
            }
            // texteditor側に反映させる
            editor.edit(builder => {
                builder.replace(ref, newtext)
            })
            return [];
        }

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;



// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}