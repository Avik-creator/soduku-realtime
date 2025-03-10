# Realtime Sudoku

Play Sudoku with your friends in real-time! This project is a collaborative Sudoku game built with Next.js and Liveblocks, allowing multiple players to solve the puzzle together simultaneously.

Through this project my AIM was to learn about LiveBlocks and will soon write an blog about it.


## 🚀 Features

- **Real-time Multiplayer:** Solve Sudoku puzzles with friends and see their moves live.
- **Multiple Difficulty Levels:** Choose from Easy, Medium, Hard, Insane, and Inhuman.
- **User Authentication:** Users can join with their names and avatars.
- **Live Chat:** Communicate with other players while solving the puzzle.
- **Game Timer:** Track your time and compete with friends.
- **Mistake Counter:** Keeps track of incorrect entries (limited to 3 mistakes).
- **Undo & Redo:** Easily undo or redo your moves.
- **Notes Mode:** Jot down potential numbers in cells.
- **Input Validation:** Enable real-time validation to highlight correct and incorrect numbers.
- **Invite Friends:** Share the game link or QR code for easy invites.
- **Theme Toggle:** Switch between light and dark modes.
- **Confetti Celebration:** Enjoy a confetti burst when you complete the puzzle! 🎉

## 🛠️ Technologies Used

### **Frontend**
- [Next.js](https://nextjs.org/) - React framework for building user interfaces.
- [React](https://reactjs.org/) - JavaScript library for UI development.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [shadcn/ui](https://ui.shadcn.com/) - Reusable components built with Radix UI and Tailwind CSS.
- [framer-motion](https://www.framer.com/motion/) - Animation library for smooth transitions.
- [lucide-react](https://lucide.dev/) - Beautifully simple icons.
- [react-qr-code](https://www.npmjs.com/package/react-qr-code) - QR code generator.
- [sonner](https://sonner.emilkowalski.com/) - Elegant toast notifications.
- [next-themes](https://www.npmjs.com/package/next-themes) - Theme switching support.
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) - Confetti animation library.

### **Backend & Realtime**
- [Liveblocks](https://liveblocks.io/) - Real-time collaboration platform.

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Avik-creator/soduku-realtime
cd sudoku-realtime
```

### 2️⃣ Install Dependencies
```bash
npm install # or yarn install or pnpm install or bun install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add your Liveblocks secret key:
```bash
LIVEBLOCKS_SECRET_KEY=sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Get your secret key from the [Liveblocks Dashboard](https://liveblocks.io/).

### 4️⃣ Run the Development Server
```bash
npm run dev # or yarn dev or pnpm dev or bun dev
```

### 5️⃣ Open in Browser
Visit [http://localhost:3000](http://localhost:3000) to access the application.

## 🚀 Deployment
The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/).
Follow the [Next.js Deployment Guide](https://nextjs.org/docs/deployment) for detailed instructions.

## 📚 Learn More
Explore the following documentation:
- [Next.js](https://nextjs.org/docs)
- [Liveblocks](https://liveblocks.io/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing
Contributions are welcome! If you have ideas for improvements or bug fixes, feel free to [open an issue](https://github.com/your-repo/issues) or submit a pull request.

## 📜 License
This project is open-source and licensed under the [MIT License](LICENSE).

---

Enjoy playing Sudoku with your friends in real-time! 🎮

