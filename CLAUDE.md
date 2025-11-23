# プロジェクト概要

このプロジェクトは**受発注管理システム**のデモアプリケーションです。

## 技術スタック

- **フレームワーク**: React 19.2.0 + TypeScript 5.9
- **ビルドツール**: Vite 7.2
- **スタイリング**: Tailwind CSS 4.1
- **チャート**: Recharts 3.4
- **アイコン**: Lucide React 0.554

## プロジェクト構造

```
masuda-v-demo/
├── src/
│   ├── components/
│   │   └── DashboardSummary.tsx  # ダッシュボード概要コンポーネント
│   ├── App.tsx                   # メインアプリケーション
│   └── main.tsx                  # エントリーポイント
├── .claude/
│   └── system.md                 # Claude Code言語設定
└── package.json
```

## 開発ガイドライン

### コーディング規約

- すべてのコードとコメントは**日本語**で記述する
- TypeScript の型定義を適切に使用する
- コンポーネントは機能ごとに分割する
- Tailwind CSS を使用してスタイリングする

### 開発コマンド

- `npm run dev`: 開発サーバー起動
- `npm run build`: プロダクションビルド
- `npm run lint`: ESLint によるコード検証
- `npm run preview`: ビルド結果のプレビュー

## 注意事項

- React 19.2 を使用しているため、最新の機能を活用できます
- Tailwind CSS v4 を使用しているため、設定方法が従来と異なる場合があります
- すべての応答は日本語で行ってください。コード内のコメントやドキュメントも日本語で記述してください。
- 実装後は lint エラーと TypeScript ビルドエラーがないことを確認してください。
