solana-volume-bot/
├── src/
│   ├── api/               # Solscan API clients
│   ├── strategies/        # Strategy modules
│   ├── data/              # Analysis & volume tools
│   ├── execution/         # Optional future on-chain trades
│   ├── ui/                # Views & styles
│   ├── server/            # Express backend + WebSocket
│   └── index.js           # Main app entry
├── public/                # Static CSS/images
├── views/                 # EJS templates
├── .env
├── botConfig.json
├── package.json
└── README.md



Initial Tasks (for Build Phase)
Set up folder structure
Connect to Solscan API:
Token transfers
Account metadata
Historical SPL volume
Build frontend UI:
Asset selector (popular Sol tokens)
Strategy config w/ tooltips
Log console (styled)
Mobile-friendly + dark theme
Implement first volume detection prototype
Connect strategy → logs → UI stream
