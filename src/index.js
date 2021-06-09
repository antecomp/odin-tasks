// Let index.js handle dom events, no real reason to seperate that out.

import {lists, UserLists} from './lists.js'
import {dom} from "./dom.js"
import { lstorage } from './local.js';

lstorage.loadLocal()

// Set first list as active
lists.changeList(Object.keys(UserLists)[0])

dom.init();