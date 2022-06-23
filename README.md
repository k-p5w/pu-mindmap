# mindmap-diagram-supporter README

plantumlで [マインドマップ記法](https://plantuml.com/ja/mindmap-diagram) 使うときの便利ツール（VSCODE拡張）です

## Features / どんなことができる

- 以下2コマンドが使用可能になります

### mindmapincrement
テキストエディタ上で、文字が選択されていた場合に、選択文字の先頭に[+]を追加する
[-]で開始されている場合は、[-]を1つ削除

### mindmapdecrement
テキストエディタ上で、文字が選択されていた場合に、選択文字の先頭に[-]を追加する
[+]で開始されている場合は、[+]を1つ削除


## Requirements /　使うために必要なもの

- vscodeのplantumlの拡張(mindmapのプレビューのために作っているため)。
- インストール後下記設定を行ってください（基本設定->キーボードショートカットでmindmapで探すと出てくるはず。）
  
  |cmd|オススメ設定|
  |:--|:--|
  |mindmapincrement|TAB|
  |mindmapdecrement|TAB+SHIFT|


- キーボードショートカットに以下を設定する

 ```keybindings.json
     {
        "key": "shift+tab",
        "command": "extension.mindmapdecrement",
        "when": "editorTextFocus && !editorReadonly && !editorTabMovesFocus && editorLangId == plantuml"
    },
    {
        "key": "tab",
        "command": "extension.mindmapincrement",
        "when": "editorTextFocus && !editorReadonly && !editorTabMovesFocus && editorLangId == plantuml"
    },
 ```




## Extension Settings / 拡張設定

vscodeの設定ファイルへの変更は不要です.

## Known Issues / 既知の課題や問題点

Windows10でのみ動作確認しています.

## Release Notes

2020/02/22:それなりに動くものになる


### 0.0.1

初回リリース。
