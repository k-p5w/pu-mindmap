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
    let disposable = vscode.commands.registerCommand('extension.mindmapincrement', function() {
        // 以下エントリを参考に実装してみる
        // https://qiita.com/delmontz/items/abd075eacb1302fc184c

        if (!vscode.window.activeTextEditor) {
            return; // no editor
        }

        // ここに実装コードを書く
        const doc = vscode.window.activeTextEditor;

        //選択範囲を取得
        const ref = doc.selection;

        if (ref) {
            // 選択範囲なし            


            var IsPos0 = false;

            // todo:先頭の文字列を取得する。。

            // 1-1.カーソル位置が先頭の場合
            if (IsPos0) {
                var IsKeyWord = false;


                // todo:1文字目から分のはじまりまでを取得する。。

                // 1-1-1.開始文字が plantumlで使う予約語？（[+|-|*]）の場合
                if (IsKeyWord) {
                    // 1-1-1-a.+ の場合			
                    var IsMapLeft = false;
                    var IsMapRight = false;

                    // todo:1文字目だけを取得する。。

                    if (IsMapLeft) {
                        // - 開始文字の前に、[+]を追加する
                        return [vscode.TextEdit.insert(firstLine.range.start, '+')];
                    } else if (IsMapRight) {
                        // 1-1-1-b.- の場合
                        // - マイナスを1つ消す。
                    } else {
                        // 1-1-1-c.* の場青
                        // - なにもしない
                    }

                } else {
                    // 1-1-2.上記以外の場合
                    // - 開始文字の前に、[+ ]を追加する
                    return [vscode.TextEdit.insert(firstLine.range.start, '+')];
                }



            } else {
                // 1-2.上記以外
                // - この拡張としてはなにもしない

            }






        } else {
            // 選択範囲あり
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