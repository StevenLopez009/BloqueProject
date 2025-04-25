# Project Documentation

## Overview

This project follows **Clean Architecture** principles to maintain a modular and scalable structure. We separate concerns by organizing the application into different layers: **components**, **hooks**, **pages**, **services**, and **utils**. 

## Folder Structure

```plaintext
src/
├── components/          # Global UI components used across the app
│   └── LeaderBoard/
│       ├── LeaderBoardComponent.tsx
│       └── LeaderBoard.css
├── hooks/               # Reusable hooks for business logic
│   └── useLeaderboard.ts
├── pages/               # Views of the app (e.g., Dashboard, Profile)
│   └── HomePage.tsx
│   └── ProfilePage.tsx
├── services/            # Observables for API requests and responses
│   └── leaderboardService.ts
├── utils/               # Helper utilities and functions
│   └── formatDate.ts
└── assets/              # Static assets like images
    └── pez.png
    └── pescador.png

```

# Project Documentation

## Components Folder

The `components` folder contains global UI components that are used across different views. These components are **pure** UI elements that do not contain business logic.

### Example: `LeaderBoardComponent.tsx`

```tsx
import React from 'react';
import './LeaderBoard.css';

const LeaderBoardComponent = () => {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      {/* Render leaderboard content */}
    </div>
  );
};

export default LeaderBoardComponent;
```
## Hooks Folder

The `hooks` folder contains custom hooks that handle reusable business logic for different parts of the application.

### Example: useLeaderboard.ts

```ts
import { useState, useEffect } from 'react';
import leaderboardService from '@services/leaderboardService';

const useLeaderboard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const sub = leaderboardService.subscribe((newPlayers) => {
      setPlayers(newPlayers);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return players;
};

export default useLeaderboard;
```
## Pages Folder

The `pages` folder contains the actual pages of the application, which represent different views the user can navigate to. Each page will import relevant components and hooks to display content.

### Example: HomePage.tsx

```tsx
import React from 'react';
import LeaderBoardComponent from '@components/LeaderBoard/LeaderBoardComponent';
import useLeaderboard from '@hooks/useLeaderboard';

const HomePage = () => {
  const players = useLeaderboard();

  return (
    <div>
      <h1>Home Page</h1>
      <LeaderBoardComponent />
      {/* Render players */}
    </div>
  );
};

export default HomePage;

```

## Services Folder

The `services` folder contains all the logic related to making API requests, typically using Observables to handle asynchronous data streams.

### Example: leaderboardService.ts

```ts
import { Observable, of } from 'rxjs';

const leaderboardService = new Observable((observer) => {
  // Simulate API call
  const players = [
    { name: 'Player 1', score: 100 },
    { name: 'Player 2', score: 90 },
  ];
  observer.next(players);
  observer.complete();
});

export default leaderboardService;

