import { Routes } from '@angular/router';
import { EmojiRainComponent } from './pages/emoji-rain/emoji-rain.component';
import { YamnetComponent } from './pages/yamnet/yamnet.component';

export const routes: Routes = [
  {
    path: '',
    component: YamnetComponent
  },
  {
    path: 'emojis',
    component: EmojiRainComponent
  },
];
