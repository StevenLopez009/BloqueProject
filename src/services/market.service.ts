import { interval, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { map } from "rxjs/operators";

export const marketService = interval(5000).pipe(
  switchMap(() =>
    fromFetch("https://api-game.bloque.app/game/market").pipe(
      switchMap(response => response.json()),
      map(data => data.items)
    )
  )
);