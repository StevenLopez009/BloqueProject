import { interval, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { map } from "rxjs/operators";

export const leaderboardService = interval(5000).pipe( // cada 5 segundos
  switchMap(() =>
    fromFetch("https://api-game.bloque.app/game/leaderboard").pipe(
      switchMap(response => response.json()),
      map(data => data.players)
    )
  )
);
