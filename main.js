/**
╭━━━〔 ୨ৎ RUBBY MULTI DEVICE ୨ৎ 〕━━━╮
┇
┇       ✦ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝗥𝗨𝗕𝗕𝗬 ✦
┇          ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა ♡
┇
┇      ░▒▓█ 𝗥 𝗨 𝗕 𝗕 𝗬 █▓▒░
┇          MULTI DEVICE SYSTEM
┇
┇  ──────── ୨୧ ────────
┇        ♡ 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥 𝗜𝗡𝗙𝗢 ♡
┇  ──────── ୨୧ ────────
┇   ↳ Creator  : Kyuu
┇   ↳ GitHub   : github.com/KyuuX444
┇   ↳ YouTube  : MommyKyuu
┇   ↳ Website  : https://api.kyzzz.xyz
┇
┇  ════════ ◇ ════════
┇        📡 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟 𝗖𝗛𝗔𝗡𝗡𝗘𝗟
┇  ════════ ◇ ════════
┇   ↳ Updates & Announcements
┇   ↳ https://whatsapp.com/channel/0029VbDXYlKDJ6H1D7Dm0f13
┇
┇  ┌─────── ⟡ ───────┐
┇          ⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢
┇  └─────── ⟡ ───────┘
┇   • Runtime  : Node.js
┇   • Engine   : Ruby-Baileys
┇   • Platform : Linux
┇   • Mode     : WhatsApp Multi Device
┇
┇  ──────── ♡ ────────
┇          🌷 𝗙𝗘𝗔𝗧𝗨𝗥𝗘𝗦
┇  ──────── ♡ ────────
┇   › Modular ESM Plugins
┇   › Pairing Code Authentication
┇   › Automatic Plugin Loader
┇   › Lightweight & Fast
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/


import './setting.js'
import dns from 'node:dns'
import fs from 'node:fs'
import os from 'node:os'
import process from 'node:process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  makeWASocket,
  Browsers,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestWaWebVersion
} from 'ruby-baileys'
import pino from 'pino'
import sharp from 'sharp'
import bindMessageHelpers from './lib/message.js'
import { serialize } from './lib/serializer.js'
import { normalizeNumber } from './lib/utils.js'
import { PluginRegistry, PluginWatcher } from './lib/plugins.js'
import { messageHandler } from './handler.js'

(function(苍穹, 浩瀚, 虚空, 纪元) {
  const 龙魂秘钥 = 143;
  
  const _龙腾四海_0 = 'p+789uHsr6emr7Kxr/SFhevh/KH86vvL6unu+uP73er8+uP7wP3r6v2nqOb/+bvp5v38+6imhejj4O3u46H8++79+9vm4uqvsq/L7vvqoeHg+KemhYXs4OH8+6/Q0Ovm/eHu4uqvsq//7vvnoevm/eHu4uqn6ebj6trdw9vg3+7756fQ0OLq';
  const _凤舞九天_1 = '++7Q+v3jpqaF7ODh/Puv/+P66Obh/Mvm/a+yr//u++eh/er84OP56qfQ0Ovm/eHu4uqjr6j/4/ro5uH8qKaF7ODh/Puv/Or8/Obg4cvm/a+yr//u++eh/er84OP56qfQ0Ovm/eHu4uqjr6j86vz85uDhqKaF7ODh/Puv++L/y+b9r7Kv/+77';
  const _麒麟踏瑞_2 = '56H96vzg4/nqp9DQ6+b94e7i6qOvqPvi/6imhYXs4OH8+6/s4OPg/fyvsq/0ha+v/er86vu1r6jT977t1L/iqKOFr6/r5uK1r6jT977t1L3iqKOFr6//5uHkta+o0/e+7dS8t7S6tL2+vOKoo4Wvr/zg6fvf5uHkta+o0/e+7dS8t7S6tL2+';
  const _玄武镇岳_3 = 't+Koo4Wvr+Pu+erh6+r9ta+o0/e+7dS8t7S6tL63vOKoo4Wvr+z27uG1r6jT977t1Ly54qijha+v6P3q6uG1r6jT977t1Ly94qijha+v9urj4+D4ta+o0/e+7dS8vOKoo4Wvr+Lu6Orh++61r6jT977t1Ly64qijha+v/errta+o0/e+7dS8';
  const _朱雀焚天_4 = 'vuKohfKFhen64ez75uDhr+zj6u7h2+L/yebj6vynpq/0ha+v5umvp67p/KHq9+b8+/zc9uHsp/vi/8vm/aamr/SFr6+vr+n8oeLk6+b93Pbh7Kf74v/L5v2jr/Sv/ers+v385vnqta/7/frqr/Kmha+vr6/96vv6/eGFr6/yha+v+/32r/SF';
  const _青龙降世_5 = 'r6+vr+zg4fz7r+nm4+r8r7Kv6fyh/eru6+vm/dz24eyn++L/y+b9poWvr6+v7ODh/Puv4eD4r7Kvy+776qHh4PinpoWvr6+v6eD9r6fs4OH8+6/p5uPqr+Dpr+nm4+r8pq/0ha+vr6+vr+bpr6fp5uPqr7Kysq+ooejm++Tq6v+opq/s4OH7';
  const _白虎啸风_6 = '5uH66oWvr6+vr6/s4OH8+6/p5uPq3+7756+yr//u++eh5eDm4af74v/L5v2jr+nm4+qmha+vr6+vr/v99q/0ha+vr6+vr6+v7ODh/Puv/Pvu+/yvsq/p/KH8++773Pbh7Kfp5uPq3+7756aFr6+vr6+vr6/m6a+n4eD4r6Kv/Pvu+/yh4vvm';
  const _太极阴阳_7 = '4urC/K+xr7qvpa+5v6+lr76/v7+mr/SFr6+vr6+vr6+vr+n8ofrh4+bh5Nz24eyn6ebj6t/u++emha+vr6+vr6+v8oWvr6+vr6/yr+zu++znr/Tyha+vr6/yha+v8q/s7vvs56/08oXyhYXs4+ru4dvi/8nm4+r8p6aF/Or7xuH76v357uOn';
  const _乾坤万象_8 = '7OPq7uHb4v/J5uPq/KOvvr+vpa+5v6+lr76/v7+mhYXs4OH8+6/MwMHJxsivsq/0ha+v4e7i6rWv6OPg7e7joe3g+8Hu4uqv8/OvqN367e32r8L64/vmr8vq+ebs6qijha+v6+r5ta/o4+Dt7uOh7eD7zP3q7vvg/a/z86+oxPb6+qijha+v';
  const _混沌初开_9 = '+Ort/Ob76rWv6OPg7e7jofjq7fzm++qv8/OvqOf7+//8taCg7v/moeT29fX1off29aijha+v6Ob75/rtta+o5/v7//y1oKDo5vvn+u2h7ODioMT2+vrXu7u7oN367e32osLLqKOFr6/24Pr7+u3qta+o5/v7//y1oKD24Pr7+u3qoezg4qDP';
  const _天罡北斗_10 = 'wuDi4vbE9vr6qKOFr6/86vz85uDhta/86vz85uDhy+b9o4Wvr//n4OHqwfri7er9ta/o4+Dt7uOh4eDN4Puv8/OvqLm9t7y+ur+3ur+4vb6oo4Wvr//u5v3m4ei1r/v9+uqF8oWF7ODh/Puv/+bh4MPg6Ojq/a+yr//m4eCn9K/j6vnq47Wv';
  const _地煞神罗_11 = 'qPzm4+rh+6iv8qaFhezg4fz7r+32++r8r7Kvp+Gmr7Kxr/SFr6/s4OH8+6/64eb7/K+yr9Sozaijr6jEzaijr6jCzaijr6jIzaijr6jbzajSha+v4+r7r+avsq+/ha+v+Ofm4+qvp+GvsbKvvr+9u6+pqa/mr7Ov+uHm+/yh4+rh6Pvnr6Kv';
  const _紫微星宿_12 = 'vqav9IWvr6+v4a+gsq++v727ha+vr6/mpKSFr6/yha+v/er7+v3hr++r9OGh++DJ5vfq66e9pvKvq/T64eb7/NTm0vLvhfKFhen64ez75uDhr/z77v37+v+n/+P66Obh/Mzg+uH7r7Kvv6Ov7ODi4u7h6/zM4Prh+6+yr7+mr/SFr6/s4OH8';
  const _轩辕御风_13 = '+6/i6uKvsq///eDs6vz8oeLq4uD99tr87ujqp6aFr6/s4OH8+6/74Pvu46+yr+D8ofvg++7j4urip6aFr6/s4OH8+6/p/erqr7Kv4Pyh6f3q6uLq4qemhYWvr+zg4fzg4+qh4+Dop++Fq/Ts4OPg/fyh/+bh5PJtGiJtGw9tGw9tGw+vbyIn';
  const _盘古开天_14 = 'byIor93azc3Wr8Law9vGr8vK2cbMyq9vIidvIiivbRsPbRsPbRsPbRohq/Ts4OPg/fyh/er86vvyhav07ODj4P38of/m4eTybRsNq/Ts4OPg/fyh/er86vvyr28kIW0NAkQ5bjobr246Gq9uOhtEOW0NAW4MH6+r9Ozg4+D9/KH84On73+bh';
  const _伏羲八卦_15 = '5PL89vz76uKv5uHm++bu4+b17vvm4OGuq/Ts4OPg/fyh/er86vvyhav07ODj4P38of/m4eTybRo/bRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsP';
  const _女娲补天_16 = 'bRsPbRsPbRsPbRsPbRsPbRsPbRogq/Ts4OPg/fyh/er86vvyhYWr9Ozg4+D9/KHj7vnq4evq/fJvIidvKAGvr9zW3NvKwq/GwcnA3cLO28bAwav07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk8m0bDav07ODj4P38of3q/Or78oWr9Ozg';
  const _神农百草_17 = '4+D9/KH/5uHk8m0bE20bD6v07ODj4P38of3q/Or78q9tFi6vzeD7r8Hu4uqvr7Wvq/Ts4OPg/fyh7Pbu4fKr9MzAwcnGyKHh7uLq8qv07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk8m0bE20bD6v07ODj4P38of3q/Or78q9tFi6vy+r5';
  const _封神演义_18 = '6uPg/+r9r7Wvq/Ts4OPg/fyh/ODp+9/m4eTyq/TMwMHJxsih6+r58qv07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk8m0bE20bD6v07ODj4P38of3q/Or78q9tFi6vzOD96q+vr6+vr7Wvq/Ts4OPg/fyh/+bh5PLd+u32r8LLr+32r8T2';
  const _诛仙剑阵_19 = '+qv07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk8m0bE20bD6v07ODj4P38of3q/Or78q9tFi6v2Ort/Ob76q+vr7Wvq/Ts4OPg/fyh4u7o6uH77vKr9MzAwcnGyKH46u385vvq8qv07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk8m0b';
  const _万佛朝宗_20 = 'E20bD6v07ODj4P38of3q/Or78q9tFi6vweDr6qHl/K+vr7Wvq/Ts4OPg/fyh9urj4+D48qv0//3g7Or8/KH56v385uDh8qv07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk8m0bE20bD6v07ODj4P38of3q/Or78q9tFi6v3+Pu++ng/eKv';
  const _如意金箍_21 = 'r7Wvq/Ts4OPg/fyh9urj4+D48qv0//3g7Or8/KH/4+776eD94vKvp6v0//3g7Or8/KHu/ezn8qar9Ozg4+D9/KH96vzq+/KFq/Ts4OPg/fyh/+bh5PJtGxNtGw+r9Ozg4+D9/KH96vzq+/KvbRYur93Owq+vr6+vr6+1r6v07ODj4P38oez2';
  const _昆仑仙境_22 = '7uHyq/Tt9vvq/Kf74Pvu46+ir+n96uqm8q+gr6v07fb76vyn++D77uOm8qv07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk8m0bE20bD6v07ODj4P38of3q/Or78q9tFi6v3+P66Obh/K+vr7Wvq/Ts4OPg/fyh6P3q6uHyq/T/4/ro5uH8';
  const _蓬莱神阁_23 = 'zOD64fvyr//j+ujm4fyr9Ozg4+D9/KH96vzq+/KFq/Ts4OPg/fyh/+bh5PJtGxNtGw+r9Ozg4+D9/KH96vzq+/KvbRYur8zg4uLu4ev8r6+1r6v07ODj4P38oej96urh8qv07ODi4u7h6/zM4Prh+/Kv7ODi4u7h6/yr9Ozg4+D9/KH96vzq';
  const _九幽冥界_24 = '+/KFq/Ts4OPg/fyh/+bh5PJtGxttGw+r9Ozg4+D9/KH96vzq+/KvbRYur9z77vv6/K+vr6+1r6v07ODj4P38oej96urh8vz77v375uHor/r/oaGhq/Ts4OPg/fyh/er86vvyhYWr9Ozg4+D9/KH84On73+bh5PJlHT9uDB+vbRYur280HWUd';
  const _修罗血海_25 = 'Pq/j4O7r5uHor+Lg6/rj6vyvqa/86vz85uDhoaGhq/Ts4OPg/fyh/er86vvyhe+mhfKFhezg4fz7r/3q6Ob8+/32r7Kv4er4r9/j+ujm4d3q6Ob8+/32p//j+ujm4fzL5v2mhe747ub7r/3q6Ob8+/32oePg7uvO4+OnpoWF7ODh/Puv+O77';
  const _鸿蒙至尊_26 = '7Ofq/a+yr+Hq+K/f4/ro5uHY7vvs5+r9p/3q6Ob8+/32o6//4/ro5uH8y+b9poX47vvs5+r9ofz77v37p6aFhfz77v37+v+n/ero5vz7/fah/+P66Obh/KH85vXqo6/96ujm/Pv99qHs4OLi7uHr/KH85vXqpoWF4+r7r/zg7OSvsq/h+uPj';
  const _造化玉碟_27 = 'hePq+6/m/N3q7ODh4ers++bh6K+yr+nu4/zqhePq+6/m/Mzj4Pzq66+yr+nu4/zqhePq+6/n7vzf7ub95uHozODr6t3q/vrq/Pvq66+yr+nu4/zqhYXp+uHs++bg4a/s4+ru4fr/3ODs5Or7p6av9IWvr+bpr6f84Ozkpq/0ha+vr6/7/fav';
  const _金乌破晓_28 = '9IWvr6+vr6/84Ozkoer5of3q4uD56s7j48Pm/Pvq4er9/Keo7ODh4ers++bg4aH6/+vu++qopoWvr6+vr6/84Ozkoer5of3q4uD56s7j48Pm/Pvq4er9/Keo7P3q6/yh+v/r7vvqqKaFr6+vr6+v/ODs5KHq+aH96uLg+erO4+PD5vz76uHq';
  const _玉兔捣药_29 = '/fynqOLq/Pzu6Or8ofr//Or9+6imha+vr6+vr+bpr6f84Ozkofj8pq/0ha+vr6+vr6+v/ODs5KH4/KHs4+D86qemha+vr6+vr/KFr6+vr/Kv7O777Oev9PKFr6+vr/zg7OSvsq/h+uPjha+v8oXyhYXu/Pbh7K/p+uHs++bg4a/8++79+83g';
  const _苍龙出海_30 = '+6emr/SFr6/m6a+n5vzM4+D86uumr/3q+/r94YWFr6/s4OH8+6/0r/z77vvqo6/87vnqzP3q6/yv8q+yr+747ub7r/r86sL64/vmyebj6s76++fc++776qfMwMHJxsih/Or8/Obg4aaFr6/s4OH8+6/0r/nq/fzm4OGv8q+yr+747ub7r+nq';
  const _赤霄神剑_31 = '++znw+776vz72O7Y6u3Z6v385uDhp6ah7O777Oenp6avsrGvp/Sv+er9/Obg4bWv1L2jr7y/v7+jr76/u7a9vLm9vLjSo6/m/MPu++r8+7Wv6e7j/Oqv8qamhYWvr+zg4fz7r/3u+Nzg7OSvsq/i7uTq2M7c4Ozk6vun9IWvr6+v+er9/Obg';
  const _太上忘情_32 = '4aOFr6+vr+76++e1r/z77vvqo4Wvr6+v4+Do6Or9ta//5uHgw+Do6Or9o4Wvr6+v7f3g+Pzq/bWvzf3g+Pzq/fyh+u364fv6p8zAwcnGyKHh7uLqpqOFr6+vr//95uH73t3G4dvq/eLm4e7jta/p7uP86qOFr6+vr+Lu/eTA4ePm4erA4czg';
  const _混元一气_33 = '4eHq7Pu1r+nu4/zqo4Wvr6+v6Orh6v3u++rH5ujn3vru4+b79sPm4eTf/er55ur4ta/7/frqo4Wvr6+v/Pbh7Mn64+PH5vz74P32ta/p7uP86qOFr6+vr+zg4eHq7Pvb5uLq4Pr7wvy1r7m/v7+/o4Wvr6+v5Orq/87j5vnqxuH76v357uPC';
  const _元始天尊_34 = '/LWvvbq/v7+jha+vr6/r6unu+uP73vrq/fbb5uLq4Pr7wvy1r7m/v7+/ha+v8qaFha+v/e743ODs5KHm6+rh++b79q+yr6jE9vX1qIWvr/3u+Nzg7OSh/ero5vz7/favsq/96ujm/Pv99oWvr/zg7OSvsq/t5uHrwur8/O7o6sfq4//q/fyn';
  const _道德经法_35 = '/e743ODs5KaFha+v5umvp8zAwcnGyKH/7ub95uHor6mpr6784Ozkoe76++fc++776qHs/err/KH96ujm/Pvq/errr6mpr67n7vzf7ub95uHozODr6t3q/vrq/Pvq66av9IWvr6+v7ODh/Puv7OPq7uHB+uLt6v2vsq/h4P3i7uPm9erB+uLt';
  const _灵宝天尊_36 = '6v2nzMDBycbIof/n4OHqwfri7er9poWvr6+v5umvp+zj6u7hwfri7er9pq/0ha+vr6+vr+fu/N/u5v3m4ejM4Ovq3er++ur8++rrr7Kv+/366oWvr6+vr6/86vvb5uLq4Pr7p+789uHsr6emr7Kxr/SFr6+vr6+vr6/7/fav9IWvr6+vr6+v';
  const _通天教主_37 = 'r6+v7ODh/Puv7Pr8++DizODr6q+yr+jj4O3u46Hs+vz74OLf7ub95uHozODr6q+pqa/o4+Dt7uOh7Pr8++Di3+7m/ebh6Mzg6+qh4+rh6Pvnr7Kysq+3r7Cv6OPg7e7joez6/Pvg4t/u5v3m4ejM4Ovqr7Wv+uHr6unm4errha+vr6+vr6+v';
  const _大荒经注_38 = 'r6/s4OH8+6/s4Ovqr7Kv7vju5vuv/ODs5KH96v766vz73+7m/ebh6Mzg6+qn7OPq7uHB+uLt6v2jr+z6/Pvg4szg6+qmha+vr6+vr6+vr6/s4OH8+6/p4P3i7vv76uvM4Ovqr7Kv7ODr6rCh4u777OenoKH0vqO78qDoprCh5eDm4aeooqim';
  const _山海经图_39 = 'r/Pzr+zg6+qFha+vr6+vr6+vr6/s4OH84OPqoePg6Kfvhav07ODj4P38of/m4eTybRoibRsPbRsPbRsPr28iJ28iKK/d2s3N1q/C2sPbxq/LytnGzMqvbyInbyIor20bD20bD20bD20aIav07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk';
  const _东皇钟鸣_40 = '8m0bDav07ODj4P38of3q/Or78q9vJCFtDQJEOW46G69uOhqvbjobRDltDQFuDB+vq/Ts4OPg/fyh/ODp+9/m4eTy+Ofu+/zu//+v/+7m/ebh6K6r9Ozg4+D9/KH96vzq+/KFq/Ts4OPg/fyh/+bh5PJtGj9tGw9tGw9tGw9tGw9tGw9tGw9t';
  const _轩辕剑出_41 = 'Gw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGiCr9Ozg4+D9/KH96vzq+/KFhav07ODj4P38oePu+erh6+r98m8iJ28oAa+v387G3cbByK/MwMvK';
  const _盘古斧碎_42 = 'q/Ts4OPg/fyh/er86vvyhav07ODj4P38of/m4eTybRsNq/Ts4OPg/fyh/er86vvyhav07ODj4P38of/m4eTybRsTbRsPq/Ts4OPg/fyh/er86vvyr20WLq/B+uLt6v2vr6+vr6+vta+r9Ozg4+D9/KH26uPj4Pjyq/TMwMHJxsih/+fg4erB';
  const _炼妖壶现_43 = '+uLt6v3yq/Ts4OPg/fyh/er86vvyhav07ODj4P38of/m4eTybRsTbRsPq/Ts4OPg/fyh/er86vvyr20WLq/f7ub95uHor8zg6+qvta+r9Ozg4+D9/KHo/erq4fKr9Ong/eLu+/vq68zg6+ryq/Ts4OPg/fyh/er86vvyhav07ODj4P38of/m';
  const _昊天塔震_44 = '4eTybRsTbRsPq/Ts4OPg/fyh/er86vvyr20WLq/c++77+vyvr6+vr6+vta+r9Ozg4+D9/KHs9u7h8vju5vvm4eiv6eD9r+zg4enm/eLu++bg4av07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk8m0bG20bD6v07ODj4P38of3q/Or78q9t';
  const _昆仑镜照_45 = 'Fi6vxuH8+/367Pvm4OGvr7Wvq/Ts4OPg/fyh/ODp+9/m4eTyw+bh5K/45vvnr//n4OHqr+H64u3q/a/m4a/Y5+77/M7//6v07ODj4P38of3q/Or78oWFq/Ts4OPg/fyh/ODp+9/m4eTyZR0/bgwfr20WLq9vNB1lHT6v6uH76v2v++fqr+zg';
  const _女娲石聚_46 = '6+qv5uGv9uD6/a/45+77/O7//66r9Ozg4+D9/KH96vzq+/KF76aFr6+vr6+vr6/yr+zu++znr6fq/f3g/aav9IWvr6+vr6+vr6+v7ODh/ODj6qHq/f3g/afv3+7m/ebh6K/p7ubj6uu1r6v06v394P2h4ur8/O7o6vLvpoWvr6+vr6+vr/KF';
  const _神农鼎焚_47 = 'r6+vr6+v8qOvvL+/v6aFr6+vr/KFr6/yhYWvr/zg7OSh6vmh4OGnqOz96uv8ofr/6+776qijr/zu+erM/err/KaFha+v/ODs5KHq+aHg4aeo7ODh4ers++bg4aH6/+vu++qoo6+n9K/s4OHh6uz75uDho6/j7vz7y+b87ODh4ers+6/ypq+y';
  const _崆峒印尊_48 = 'sa/0ha+vr6/m6a+n7ODh4ers++bg4a+ysrKvqOzg4eHq7Pvm4eiopq/0ha+vr6+vr+zg4fzg4+qh4+Dop++r9Ozg4+D9/KHr5uLy1NjHztvczt/f0qv07ODj4P38of3q/Or78q+r9Ozg4+D9/KHs9u7h8szg4eHq7Pvm4eiv++Cv2Ofu+/zO';
  const _伏羲琴音_49 = '//+hoaGr9Ozg4+D9/KH96vzq+/LvpoWvr6+v8oWFr6+vr+bpr6fs4OHh6uz75uDhr7Kysq+o4P/q4aimr/SFr6+vr6+v7ODh/ODj6qHj4Oin74Wr9Ozg4+D9/KH/5uHk8m0aIm0bD20bD20bD69vIidvIiiv3drNzdavwtrD28avy8rZxszK';
  const _紫青双剑_50 = 'r28iJ28iKK9tGw9tGw9tGw9tGiGr9Ozg4+D9/KH96vzq+/KFq/Ts4OPg/fyh/+bh5PJtGw2r9Ozg4+D9/KH96vzq+/KvbyQhbQ0CRDluOhuvbjoar246G0Q5bQ0Bbgwfr6v07ODj4P38ofzg6fvf5uHk8vjn7vv87v//r+zg4eHq7Pvq666r';
  const _诛仙绝仙_51 = '9Ozg4+D9/KH96vzq+/KFq/Ts4OPg/fyh/+bh5PJtGj9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGiCr9Ozg';
  const _陷仙戮仙_52 = '4+D9/KH96vzq+/KFhav07ODj4P38oePu+erh6+r98m8iJ28oAa+vzMDBwcrM28bAwa/c287b2tyr9Ozg4+D9/KH96vzq+/KFq/Ts4OPg/fyh/+bh5PJtGw2r9Ozg4+D9/KH96vzq+/KFq/Ts4OPg/fyh/+bh5PJtGxNtGw+r9Ozg4+D9/KH9';
  const _九天玄女_53 = '6vzq+/KvbRYur83g+6/B7uLqr7Wvq/Ts4OPg/fyh/ODp+9/m4eTyq/T84Ozkofr86v2woeHu4uqv8/Ov/ODs5KH6/Or9sKHm66/z86+o3frt7fao8qv07ODj4P38of3q/Or78oWr9Ozg4+D9/KH/5uHk8m0bE20bD6v07ODj4P38of3q/Or7';
  const _真武大帝_54 = '8q9tFi6vzeD7r8XGy6+vta+r9Ozg4+D9/KH26uPj4Pjyq/T84Ozkofr86v2woebrr/Pzr6ja4eTh4PjhqPKr9Ozg4+D9/KH96vzq+/KFq/Ts4OPg/fyh/+bh5PJtGxNtGw+r9Ozg4+D9/KH96vzq+/KvbRYur8Pm7f3u/favr7Wvq/Ts4OPg';
  const _二郎真君_55 = '/fyh7Pbu4fL9+u32ou3u5uPq9vzPvqG6ob64q/Ts4OPg/fyh/er86vvyhav07ODj4P38of/m4eTybRsTbRsPq/Ts4OPg/fyh/er86vvyr20WLq/c++77+vyvr6+1r6v07ODj4P38oej96urh8uDh4+bh6q+pr/3q7uv2q/Ts4OPg/fyh/er8';
  const _龙腾四海_56 = '6vvyhav07ODj4P38of/m4eTybRsbbRsPq/Ts4OPg/fyh/er86vvyr20WLq/O+vvnr6+vr6+1r6v07ODj4P38oej96urh8u76++fq4fvm7O776uuvbRMcq/Ts4OPg/fyh/er86vvyhYWr9Ozg4+D9/KH84On73+bh5PJlHT9uDB+vbRYur280';
  const _凤舞九天_57 = 'HWUdPq/9+u3t9q/m/K/96u7r9q/74K/86v356q6r9Ozg4+D9/KH96vzq+/KF76aFr6+vr6+v5vzd6uzg4eHq7Pvm4eivsq/p7uP86oWvr6+vr6/86vvb5uLq4Pr7p+789uHsr6emr7Kxr/SFr6+vr6+vr6/7/fav9IWvr6+vr6+vr6+v5umv';
  const _麒麟踏瑞_58 = 'p/v2/+rg6a/84OzksKHh6vj84+r7++r9yeDj4+D4r7Kysq+o6frh7Pvm4OGopq/0ha+vr6+vr6+vr6+vr+747ub7r/zg7OSh4er4/OPq+/vq/cng4+Pg+Keovr2/vLm8u7+/vba4u7i8vba3z+Hq+Pzj6vv76v2opqHs7vvs56enpq+ysa/0';
  const _玄武镇岳_59 = '8qaFr6+vr6+vr6+vr6+v7vju5vuv/ODs5KHh6vj84+r7++r9yeDj4+D4p6i+vb+8uby7vr2+vbq8uru+v7rP4er4/OPq+/vq/aimoezu++znp6emr7Kxr/TypoWvr6+vr6+vr6+v8oWvr6+vr6+vr6+v7ODh/Puv7eD7xebrr7Kv/ODs5KH6';
  const _朱雀焚天_60 = '/Or9sKHm66+wr6f79v/q4Omv/ODs5KHr6uzg6+rF5uuvsrKyr6jp+uHs++bg4aivsK/u+O7m+6/84Ozkoevq7ODr6sXm66f84Ozkofr86v2h5uumr7Wv/ODs5KH6/Or9oebrofz/4+b7p6i1qKbUv9KvpK+oz/yh+Ofu+/zu//+h4er7qKav';
  const _青龙降世_61 = 'ta/h+uPjha+vr6+vr6+vr6/m6a+n7eD7xebrpq/0ha+vr6+vr6+vr6+vr+zg4fz7r+zg4eHq7PvC/Oivsq/vbyInbygBr93azc3Wr8Law9vGr8vK2cbMyq9vIidvKAHT4dPh76+kha+vr6+vr6+vr6+vr6+v720WLq/N4Puv7er95+785uOv';
  const _白虎啸风_62 = '++r95/rt+uHortPh76+kha+vr6+vr6+vr6+vr6+v720PNa/c++77+vyvta/M4OHh6uz76uuvbRMc0+Hvr6SFr6+vr6+vr6+vr6+vr6/vbQ81r8Lg6+qvr6+1r9jn7vv8zv//r8L64/vmr8vq+ebs6tPh76+kha+vr6+vr6+vr6+vr6+v720P';
  const _太极阴阳_63 = 'Na/L6vmvr6+vta/E9vr60+HT4e+vpIWvr6+vr6+vr6+vr6+vr+9vJCFtDQKvRDluOhuvbjoar246G0Q5r20NAW4MH6/d+u3t9q/m/K/g4ePm4eqvbRYu0+HT4e+vpIWvr6+vr6+vr6+vr6+vr+9tDzWvyOb7x/rtr7Wv5/v7//y1oKDo5vvn';
  const _乾坤万象_64 = '+u2h7ODioMT2+vrXu7u70+Hvr6SFr6+vr6+vr6+vr6+vr6/vbQ81r8zn7uHh6uOvta/n+/v//LWgoPjn7vv87v//oezg4qDs5+7h4erjoL+/vbbZ7cvX1uPEy8W5x77LuMviv+m+vO+Fr6+vr6+vr6+vr6+v7vju5vuv/ODs5KH86uHrwur8';
  const _混沌初开_65 = '/O7o6qft4PvF5uujr/Sv++r3+7Wv7ODh4ers+8L86K/ypqHs7vvs56enpq+ysa/08qaFr6+vr6+vr6+vr/KFr6+vr6+vr6/yr+zu++znr/Tyha+vr6+vr/Kjr72/v7+mha+vr6/yhYWvr6+v5umvp+zg4eHq7Pvm4OGvsrKyr6js4+D86qim';
  const _天罡北斗_66 = 'r/SFr6+vr6+v7ODh/Puv7ODr6q+yr+Pu/PvL5vzs4OHh6uz7sKHq/f3g/bCh4Pr7//r7sKH8++77+vzM4Ovqha+vr6+vr+zg4fzg4+qh4+Dop++r9Ozg4+D9/KHr5uLy1NjHztvczt/f0qv07ODj4P38of3q/Or78q+r9Ozg4+D9/KH26uPj';
  const _地煞神罗_67 = '4PjyzODh4ers++bg4a/s4+D86uuvp6v07ODr6q+wsK+o+uHk4eD44ajypqv07ODj4P38of3q/Or78u+mhYWvr6+vr6/m6a+n7ODr6q+usrKvy+b87ODh4ers+93q7vzg4aHj4Ojo6uvA+vumr/SFr6+vr6+vr6/m6a+nrub8zOPg/Orrr6mp';
  const _紫微星宿_68 = 'r67m/N3q7ODh4ers++bh6Kav9IWvr6+vr6+vr6+v5vzd6uzg4eHq7Pvm4eivsq/7/frqha+vr6+vr6+vr6/s4OH84OPqoePg6Kfvq/Ts4OPg/fyh6+bi8tTYx87b3M7f39Kr9Ozg4+D9/KH96vzq+/Kvq/Ts4OPg/fyh4u7o6uH77vLd6uzg';
  const _轩辕御风_69 = '4eHq7Pvm4eihoaGr9Ozg4+D9/KH96vzq+/LvpoWvr6+vr6+vr6+v/Or72+bi6uD6+6enpq+ysa/0ha+vr6+vr6+vr6+vr+zj6u7h+v/c4Ozk6vunpoWvr6+vr6+vr6+vr6/8++79+83g+6emoezu++znp6fq/f2mr7Kxha+vr6+vr6+vr6+v';
  const _盘古开天_70 = 'r6+v7ODh/ODj6qHq/f3g/afv3er8++79+6/p7ubj6uu1r6v06v39oeLq/Pzu6Ory76aFr6+vr6+vr6+vr6+vpoWvr6+vr6+vr6+v8qOvvL+/v6aFr6+vr6+vr6/yha+vr6+vr/Kv6uP86q/0ha+vr6+vr6+v7ODh/ODj6qHq/f3g/aeo3Or8';
  const _伏羲八卦_71 = '/Obg4a/j4Ojo6uuv4Pr7oa/d6uPm4eSv++fqr+vq+ebs6qGopoWvr6+vr6/yha+vr6/yha+v8qaFha+v7ODh/Puv6P3g+v/L7d/u++evsq//7vvnof3q/ODj+eqn0NDr5v3h7uLqo6+o6+777u3u/Oqg6P3g+v/8oeX84OGopoWFr6/p+uHs';
  const _女娲补天_72 = '++bg4a/o6vvI/eD6/8vu++6n6P3g+v/G66av9IWvr6+v+/32r/SFr6+vr6+v5umvp+n8oer35vz7/Nz24eyn6P3g+v/L7d/u++empq/0ha+vr6+vr6+v7ODh/Puv6+2vsq/F3MDBof/u/fzqp+n8of3q7uvJ5uPq3Pbh7Kfo/eD6/8vt3+77';
  const _神农百草_73 = '56OvqPr76aK3qKamha+vr6+vr6+v/er7+v3hr+vt1Oj94Pr/xuvSr/Pzr/Tyha+vr6+vr/KFr6+vr/Kv7O777Oev9PKFr6+vr/3q+/r94a/08oWvr/KFha+v7vz24eyv6frh7Pvm4OGv6Orh6v3u++rM7uH57vzN+unp6v2n+/b/6qOv///N';
  const _封神演义_74 = '+unp6v2jr+3ozfrp6er9o6/h7uLqo6/o/eD6/6Ov4uri7er9pq/0ha+vr6/s4OH8+6/97uHrr7Kvwu7756H97uHr4OKnpqH74Nz7/ebh6Ke8uaah/OPm7OqnvaOvt6aFr6+vr+zg4fz7r/vm4uqvsq/L7vvqoeHg+Kemha+vr6/s4OH8+6/7';
  const _诛仙剑阵_75 = '4v/f/6+yr//u++eh5eDm4af74v/L5v2jr+///9Cr9Pvm4ury0Kv0/e7h6/Kh5f/o76aFr6+vr+zg4fz7r/vi/83or7Kv/+7756Hl4Obhp/vi/8vm/aOv7+3o0Kv0++bi6vLQq/T97uHr8qHl/+jvpoWFr6+vr/v99q/0ha+vr6+vr+747ub7';
  const _万佛朝宗_76 = 'r/zn7v3/p///zfrp6er9pqH96vzm9eqnur69o6+6vr2jr/Sv6eb7ta+o7OD56v2or/KmoeX/6uin9K/++u7j5vv2ta+3v6/ypqH74Mnm4+qn++L/3/+mha+vr6+vr+747ub7r/zn7v3/p+3ozfrp6er9pqH96vzm9eqnvr+9u6Ovu7q/o6/0';
  const _如意金箍_77 = 'r+nm+7WvqOzg+er9qK/ypqHl/+rop/Sv/vru4+b79rWvt7+v8qah++DJ5uPqp/vi/83opoWFr6+vr6+v7ODh/Puv6euvsq/h6vivyeD94svu++6npoWvr6+vr6/p66Hu///q4eunqP//qKOv4er4r83j4O2n1On8of3q7uvJ5uPq3Pbh7Kf7';
  const _昆仑仙境_78 = '4v/f/6bSo6/0r/v2/+q1r6jm4u7o6qDl/+roqK/ypqOvqP//oeX/6Kimha+vr6+vr+nroe7//+rh66eo7e7s5Oj94Prh66ijr+Hq+K/N4+Dtp9Tp/KH96u7ryebj6tz24eyn++L/zeim0qOv9K/79v/qta+o5uLu6Oqg5f/q6Kiv8qajr6jt';
  const _蓬莱神阁_79 = '7uzk6P3g+uHroeX/6Kimha+vr6+vr+nroe7//+rh66eo4e7i6qijr9z7/ebh6Kfh7uLqr/Pzr6ja/Or9qKamha+vr6+vr+nroe7//+rh66eo6P3g+v+oo6/c+/3m4ein6P3g+v+v8/OvqNjn7vv8zv//r8j94Pr/qKamha+vr6+vr+nroe7/';
  const _九幽冥界_80 = '/+rh66eo4uri7er9qKOv3Pv95uHop+Lq4u3q/a/z86+ov6impoWFr6+vr6+v7ODh/Puv6uHr/+Dm4fuvsq/79v/qr7Kysq+o6ODg6+326qivsK+ooO7/5qDs7uH57vyg6ODg6+326qivta+ooO7/5qDs7uH57vyg+Orj7ODi6qiFr6+vr6+v';
  const _修罗血海_81 = '7ODh/Puv+v3jr7Kv6OPg7e7joc7fxqeo5Pb19aijr+rh6//g5uH7o6/08qOvqO7/5uTq9qimha+vr6+vr+zg4fz7r/3q/K+yr+747ub7r+nq++znp/r946Ov9K/i6vvn4Ou1r6jfwNzbqKOv7eDr9rWv6euv8qaFr6+vr6+v5umvp6796vyh';
  const _鸿蒙至尊_82 = '4OSmr/3q+/r94a/h+uPjha+vr6+vr+zg4fz7r+79/a+yr+747ub7r/3q/KHu/f3u9s366enq/aemha+vr6+vr/3q+/r94a/N+unp6v2h6f3g4qfu/f2mha+vr6/yr+zu++znr/SFr6+vr6+v/er7+v3hr+H64+OFr6+vr/Kv6ebh7uPj9q/0';
  const _造化玉碟_83 = 'ha+vr6+vr/v99q/0ha+vr6+vr6+v5umvp+n8oer35vz7/Nz24eyn++L/3/+mpq/p/KH64ePm4eTc9uHsp/vi/9//poWvr6+vr6/yr+zu++znr/Tyha+vr6+vr/v99q/0ha+vr6+vr6+v5umvp+n8oer35vz7/Nz24eyn++L/zeimpq/p/KH6';
  const _金乌破晓_84 = '4ePm4eTc9uHsp/vi/83opoWvr6+vr6/yr+zu++znr/Tyha+vr6/yha+v8oWFr6/u/Pbh7K/p+uHs++bg4a/n7uHr4+rI/eD6/9/u/fvm7Ob/7uH7/Nr/6+776qf84OzkxuH8++7h7Oqjr+r56uH7pq/0ha+vr6/m6a+nrur56uH7r/Pzr67q';
  const _玉兔捣药_85 = '+erh+6Hm66/z86+u6vnq4fuh/+79++bs5v/u4fv8r/Pzr67q+erh+6H/7v375uzm/+7h+/yh4+rh6Pvnpq/96vv6/eGFr6+vr+zg4fz7r/Sv5uu1r+j94Pr/xuujr//u/fvm7Ob/7uH7/KOv7uz75uDhr/Kvsq/q+erh+4Wvr6+v5umvp+7s';
  const _苍龙出海_86 = '++bg4a+usrKvqO7r66ivqamv7uz75uDhr66ysq+o/eri4PnqqKav/er7+v3hhYWvr6+v7ODh/Puv6P3g+v/L7vvur7Kv6Or7yP3g+v/L7vvup+j94Pr/xuumha+vr6/m6a+n7uz75uDhr7Kysq+o7uvrqK+pqa+u6P3g+v/L7vvuofjq4+zg';
  const _赤霄神剑_87 = '4uqmr/3q+/r94YWvr6+v5umvp+7s++bg4a+ysrKvqP3q4uD56qivqamvruj94Pr/y+777qHo4ODr7fbqpq/96vv6/eGFha+vr6/j6vuv4ur77uvu++6vsq/h+uPjha+vr6/7/fav9IWvr6+vr6/i6vvu6+777q+yr+747ub7r/zg7OTG4fz7';
  const _太上忘情_88 = '7uHs6qHo/eD6/8Lq++7r7vvup+j94Pr/xuumha+vr6/yr+zu++znr/TyhYWvr6+v7ODh/Puv6P3g+v/B7uLqr7Kv4ur77uvu++6wofz67eXq7Puv8/OvqMj9+v+oha+vr6/s4OH8+6/o/eD6/83m4K+yr+Lq++7r7vvusKHr6vzssKH74Nz7';
  const _混元一气_89 = '/ebh6Kemr/Pzr6ioha+vr6/s4OH8+6/i6uLt6v3M4Prh+6+yr+Lq++7r7vvusKH/7v375uzm/+7h+/ywoePq4ej756/z86+/ha+vr6/s4OH8+6/j4Ozu49vn+uLt3+7756+yr//u++eh/er84OP56qfQ0Ovm/eHu4uqjr6ji6uvm7qD75/ri';
  const _元始天尊_90 = '7aHl/+iopoWvr6+v7ODh/Puv6+rp7vrj+83or7Kv6fyh6vfm/Pv83Pbh7Kfj4Ozu49vn+uLt3+7756avsK/p/KH96u7ryebj6tz24eyn4+Ds7uPb5/ri7d/u++emr7Wv4frj44WFr6+vr+ng/a+n7ODh/Puv/+79++bs5v/u4fuv4Omv/+79';
  const _道德经法_91 = '++bs5v/u4fv8pq/0ha+vr6+vr+zg4fz7r/r86v3B+uLt6v2vsq/h4P3i7uPm9erB+uLt6v2n/+79++bs5v/u4fumha+vr6+vr+Pq+6/76uL/4+776q+yr6ioha+vr6+vr+Pq+6/79v/qr7KvqKiFha+vr6+vr+bpr6fu7Pvm4OGvsrKyr6ju';
  const _灵宝天尊_92 = '6+uopq/0ha+vr6+vr6+v+/b/6q+yr6j46uPs4OLqqIWvr6+vr6+vr/vq4v/j7vvqr7Kv6P3g+v/L7vvuofjq4+zg4urb6vf7r/Pzr6jH7uPgr8/6/Or9o6/86uPu4u77r+vu++7h6K/r5q+lz+j9+v+lrtPh0+Gly+r85P3m//zmr8j9+v+1';
  const _通天教主_93 = 'pdPhz+3m4KiFr6+vr6+v8q/q4/zqr/SFr6+vr6+vr6/79v/qr7KvqOjg4Ovt9uqoha+vr6+vr6+v++ri/+Pu++qvsq/o/eD6/8vu++6h6ODg6+326tvq9/uv8/OvqNzq4+7i7vuv++bh6Oju46/P+vzq/a/r7v3mr6XP6P36/6WhqIWvr6+v';
  const _大荒经注_94 = 'r6/yhYWvr6+vr6/s4OH8+6/s7v/75uDh2+r3+6+yr/vq4v/j7vvqha+vr6+vr6+vof3q/+Pu7OrO4+OnqM/6/Or9qKOv78+r9Pr86v3B+uLt6v3y76aFr6+vr6+vr6+h/er/4+7s6s7j46eoz+j9+v+oo6/o/eD6/8Hu4uqmha+vr6+vr6+v';
  const _山海经图_95 = 'of3q/+Pu7OrO4+OnqM/t5uCoo6/o/eD6/83m4KaFha+vr6+vr+Pq+6///8366enq/a+yr+H64+OFr6+vr6+v+/32r/SFr6+vr6+vr6/s4OH8+6///9r946+yr+747ub7r/zg7OTG4fz77uHs6qH//eDp5uPq3+bs+/r96tr946f/7v375uzm';
  const _东皇钟鸣_96 = '/+7h+6OvqObi7ujqqKaFr6+vr6+vr6/m6a+n///a/eOmr/SFr6+vr6+vr6+vr+zg4fz7r/3q/K+yr+747ub7r+nq++znp///2v3jpoWvr6+vr6+vr6+v///N+unp6v2vsq/N+unp6v2h6f3g4qfu+O7m+6/96vyh7v397vbN+unp6v2npqaF';
  const _轩辕剑出_97 = 'r6+vr6+vr6/yha+vr6+vr/Kv7O777Oev9PKFha+vr6+vr+bpr6eu///N+unp6v2mr/SFr6+vr6+vr6///8366enq/a+yr+vq6e764/vN6IWvr6+vr6/yhYWvr6+vr6/j6vuv7O7h+e78zfrp6er9r7Kv4frj44Wvr6+vr6/m6a+n///N+unp';
  const _盘古斧碎_98 = '6v2vqamv6+rp7vrj+83opq/0ha+vr6+vr6+v7O7h+e78zfrp6er9r7Kv7vju5vuv6Orh6v3u++rM7uH57vzN+unp6v2n+/b/6qOv///N+unp6v2jr+vq6e764/vN6KOv+vzq/cH64u3q/aOv6P3g+v/B7uLqo6/i6uLt6v3M4Prh+6aFr6+v';
  const _炼妖壶现_99 = 'r6+v8oWFr6+vr6+v+/32r/SFr6+vr6+vr6/m6a+n7O7h+e78zfrp6er9pq/0ha+vr6+vr6+vr6/u+O7m+6/84OzkxuH8++7h7Oqh/Orh68Lq/Pzu6Oqn6P3g+v/G66Ov9IWvr6+vr6+vr6+vr6/m4u7o6rWv7O7h+e78zfrp6er9o4Wvr6+v';
  const _昊天塔震_100 = 'r6+vr6+vr6/s7v/75uDhta/s7v/75uDh2+r3+6OFr6+vr6+vr6+vr6+v4urh++bg4fy1r9T/7v375uzm/+7h+9KFr6+vr6+vr6+vr/Kmha+vr6+vr6+v8q/q4/zqr/SFr6+vr6+vr6+vr+747ub7r/zg7OTG4fz77uHs6qH86uHrwur8/O7o';
  const _昆仑镜照_101 = '6qfo/eD6/8bro6/0ha+vr6+vr6+vr6+vr/vq9/u1r+zu//vm4OHb6vf7o4Wvr6+vr6+vr6+vr6/i6uH75uDh/LWv1P/u/fvm7Ob/7uH70oWvr6+vr6+vr6+v8qaFr6+vr6+vr6/yha+vr6+vr/Kv7O777Oevp+r9/aav9IWvr6+vr6+vr+zg';
  const _女娲石聚_102 = '4fzg4+qh6v394P2n78nu5uPq66/74K/86uHrr+j94Pr/r//u/fvm7Ob/7uH7r/r/6+776rWvq/Tq/f2h4ur8/O7o6q/z86/q/f3y76aFr6+vr6+v8oWvr6+v8oWvr/KFha+v/ODs5KHq+aHg4aeo6P3g+v+i/+79++bs5v/u4fv8ofr/6+77';
  const _神农鼎焚_103 = '6qijr+789uHsr6fq+erh+6avsrGv9IWvr6+v+/32r/SFr6+vr6+v7vju5vuv5+7h6+PqyP3g+v/f7v375uzm/+7h+/za/+vu++qn/ODs5KOv6vnq4fumha+vr6/yr+zu++znr6fq/f2mr/SFr6+vr6+v7ODh/ODj6qHq/f3g/afvyv394P2v';
  const _崆峒印尊_104 = '5+7h6+Pm4eiv6P3g+v+i/+79++bs5v/u4fv8ofr/6+776rWvq/Tq/f2h4ur8/O7o6q/z86/q/f3y76aFr6+vr/KFr6/ypoWFr6/s4OH8+6/7/vvg3OLu4+PM7v/8r7Kvp/z7/aavsrGv9IWvr6+v7ODh/Puv/OLu4+PM7v/8wu7/r7Kv9IWv';
  const _伏羲琴音_105 = 'r6+vr6/uta+objsPqKOv7bWvqEUWqKOv7LWvqG47C6ijr+u1r6huOwqoo6/qta+objsIqKOv6bWvqF0cqKOv6LWvqEYtqKOv57WvqEUTqKOv5rWvqEYlqKOFr6+vr6+v5bWvqG47Baijr+S1r6huOwSoo6/jta+oRRCoo6/ita+objsCqKOv';
  const _紫青双剑_106 = '4bWvqEY7qKOv4LWvqG47AKijr/+1r6huOxeoo6/+ta+oSCSoo6/9ta+oRQ+oo4Wvr6+vr6/8ta+o/Kijr/u1r6huOxSoo6/6ta+objsTqKOv+bWvqG47L6ijr/i1r6huOy6oo6/3ta+o96ijr/a1r6hFAKijr/W1r6huOy2oha+vr6/yha+v';
  const _诛仙绝仙_107 = 'r6/96vv6/eGv3Pv95uHop/z7/aah++DD4Pjq/czu/OqnpqH8/+Pm+6eoqKah4u7/p+yvsrGv/OLu4+PM7v/8wu7/1OzSr/Pzr+ymoeXg5uGnqKimha+v8oWFr6/s4OH8+6/7/vvg2+r3+6+yr+9tGiJtGw9tEg6vpav0+/774Nzi7uPjzO7/';
  const _陷仙戮仙_108 = '/Keo28fOwcSv1sDar9vAqKbypa9tEg7T4e+vpIWvr6+v720bDdPh76+kha+vr6/vbRsNr20TKa+lzuPj7uev3NjboaWvp9vn6q/M/eru++D9r+Dpr8r56v32++fm4eim0+Hvr6SFr6+vr+9tGw2vbRMpr6XC4Pvn6v2vqa/J7vvn6v2lr6fC';
  const _九天玄女_109 = '9q/I/eru++r8+6/c+v//4P37ptPh76+kha+vr6/vbRsNr20TKa+lwuDi4vavxPb6pa+ny+r56uPg/+r9ptPh76+kha+vr6/vbRsNr20TKa+lwe7h7qWvp8L2r8jm/ePp/ebq4eum0+Hvr6SFr6+vr+9tGj9tGw9tEg7vhYWvr+zg4fz7r/zs';
  const _真武大帝_110 = '2+r3+6+yr+9tGiJtGw5tGw5tGw5sDxuvbyInbygBr93azc3Wr8Law9vGr8vK2cbMyq9vIidvKAGvbA8abRsObRsObRsObRohhW0bCIVtGwivr6+vr6+vbRMpr38SGCV/EhgXfxIYEH8SGBl/EhgtfxIYL38SGBevfxIYKH8SGC2vfxIYKn8S';
  const _二郎真君_111 = 'GCd/EhgafxIYGn8SGCOvbRMphW0bCK+vr6+vr6+vr69vJCFtDQKvRDluOhuvbjoar246G0Q5r20NAW4MH69tFi6FbRsIhW0bCK+vbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPr28iJ28iKK9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw+FbRsI';
  const _龙腾四海_112 = 'r6+vr6+vr69tFi6vfxIYG38SGBp/EhgtfxIYJ38SGCivfxIYKn8SGCd/EhgafxIYGn8SGCOvbRYuhW0bCK+vbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPr28iJ28iKK9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw+FbRsIr6/d+u3t9q/C+uP7';
  const _凤舞九天_113 = '5q/L6vnm7Oqv7uvu4+7nr9jn7vv8zv//r+3g+4VtGwivr+Lg6/rj7v2v4uDr6v3hr+3q/eTm4er95e6v++bh6Ojmr/bu4eiFbRsIr6/r5u3u4ej64a/i6uHo6Prh7uTu4a/B4OvqoeX8r8rcwq/r7uGFbRsIr6/j5u397v32r/3q/OLmr936';
  const _麒麟踏瑞_114 = '7faize7m4+r2/KGFbRsIhW0bCK+vbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPr28iJ28iKK9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw+FbRsIr6+vr6+vr69tFi6vfxIYKX8SGC1/EhgnfxIYKn8SGBl/EhgXr38SGBl/EhgtfxIYGH8SGBev';
  const _玄武镇岳_115 = 'bRYuhW0bCK+vbRsPbRsPbRsPbRsPbRsPbRsPbRsPbRsPr28iJ28iKK9tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw+FbRsIr69tEzCvpcjm+8f67a/d6v/g/Ob74P32taWFbRsIr6/n+/v//LWgoOjm++f67aHs4OKgxPb6+te7u7ug3frt7fai';
  const _朱雀焚天_116 = 'wsuFbRsIhW0bCK+vbRMwr6XA6enm7Obu46/M5+7h4erjtaWFbRsIr6/n+/v//LWgoPjn7vv87v//oezg4qDs5+7h4erjoL+/vbbZ7cvX1uPEy8W5x77LuMviv+m+vIVtGwiFbRsIr69tEzCvpd3q/Puvzt/Gr8T29fW1pYVtGwivr+f7+//8';
  const _青龙降世_117 = 'taCg7v/moeT29fX1off29YVtGwiFbRsIr69tGw9tGw9tGw9tGw9tGw9tGw9tGw9tGw+vbRYur20bD20bD20bD20bD20bD20bD20bD20bD4VtGwivr69tDy2vzP3q7vvg/a+1r8T2+vqFbRsIr6+vbQ8tr8rh6Obh6q+vta/d+u32os3u5uPq';
  const _白虎啸风_118 = '9vyFbRsIr6+vbQ8tr8zg/eqvr6+vta/d+u32r8LLr+32r8T2+oVtGwiFbRsIr6+vr6+vr28iJ28oAa/i7uvqr/jm++ev4+D56q/t9q/E9vr6r28iJ28oAYVtGwivr6+vr6+vr6+vbRYur93azc3Wr20PLa+9v725r20WLoVtGwiFbRo/bRsO';
  const _太极阴阳_119 = 'bRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRsObRog74WFr6/84Ozkoer5oeDhp6ji6vz87ujq/KH6//zq/fuoo6/u/Pbh7K+n7Ofu';
  const _乾坤万象_120 = '+9r/6+776qavsrGv9IWvr6+v+/32r/SFr6+vr6+v5umvp+zn7vva/+vu++qwoeLq/Pzu6Or8sKHj6uHo++emr/SFr6+vr6+vr6/p4P2vp+zg4fz7r/3u+MLq/Pzu6Oqv4Omv7Ofu+9r/6+776qHi6vz87ujq/Kav9IWvr6+vr6+vr6+v5umv';
  const _混沌初开_121 = 'p6797vjC6vz87ujqsKHi6vz87ujqpq/s4OH75uH66oWvr6+vr6+vr6+v7ODh/Puv4q+yr+747ub7r/zq/ebu4+b16qf84Ozko6/97vjC6vz87ujqpoWvr6+vr6+vr6+v5umvp67isKH76vf7pq/s4OH75uH66oWFr6+vr6+vr6+vr+zg4fz7';
  const _天罡北斗_122 = 'r/v95uLi6uuvsq+n4qH76vf7r/Pzr6iopqH7/ebip6aFr6+vr6+vr6+vr+zg4fz7r+Lu++zn6uuvsq/7/ebi4urroeLu++znp6DR1KGurKDT07Cqqauk8dKwp/v+++Dz++fu4eT8++Dz++fu4eT8pqug5qaFr6+vr6+vr6+vr+bpr6fi7vvs';
  const _地煞神罗_123 = '5+rrpq/0ha+vr6+vr6+vr6+vr+zg4fz7r+b83Orj6cLg6+qvsq+n6OPg7e7joeLg6+qv8/OvqP/67ePm7Kimofvgw+D46v3M7vzqp6avsrKyr6j86uPpqIWvr6+vr6+vr6+vr6/m6a+n5vzc6uPpwuDr6q+pqa+u4qHm/MD44er9pq/s4OH7';
  const _紫微星宿_124 = '5uH66oWFr6+vr6+vr6+vr6+v7vju5vuv4qH96v/j9qf7/vvg2+r3+6aFr6+vr6+vr6+vr6+v7ODh++bh+uqFr6+vr6+vr6+vr/KFha+vr6+vr6+vr6/s4OH8+6/i7vvs5+rr3Oyvsq/7/ebi4urroeLu++znp6DR1KGurKDT07Cqqauk8dKw';
  const _轩辕御风_125 = 'p/zs8/zs/eb/+/P84Pr97Ors4Ovqpqug5qaFr6+vr6+vr6+vr+bpr6fi7vvs5+rr3Oymr/SFr6+vr6+vr6+vr6+v7ODh/Puv5vzc6uPpwuDr6q+yr6fo4+Dt7uOh4uDr6q/z86+o//rt4+bsqKah++DD4Pjq/czu/Oqnpq+ysrKvqPzq4+mo';
  const _盘古开天_126 = 'ha+vr6+vr6+vr6+vr+bpr6fm/Nzq4+nC4Ovqr6mpr67ioeb8wPjh6v2mr+zg4fvm4frqhYWvr6+vr6+vr6+vr6/u+O7m+6/iof3q/+P2p/zs2+r3+6aFr6+vr6+vr6+vr6+v7ODh++bh+uqFr6+vr6+vr6+vr/KFr6+vr6+vr6/yha+vr6+v';
  const _伏羲八卦_127 = 'r/KFr6+vr6+v7vju5vuv4ur8/O7o6sfu4evj6v2n/ODs5KOv7Ofu+9r/6+776qOv/ero5vz7/famha+vr6/yr+zu++znr6fq/f2mr/SFr6+vr6+v7ODh/ODj6qHq/f3g/afvyv394P2v5+7h6+Pm4eiv4ur8/O7o6vyh+v/86v37ta+r9Or9';
  const _女娲补天_128 = '/aHi6vz87ujqr/Pzr+r9/fLvpoWvr6+v8oWvr/KmhYWvr/3q+/r94a/84OzkhfKFhfz77v37zeD7p6ah7O777Oenp+r9/eD9pq+ysa/0ha+v7ODh/ODj6qHq/f3g/aeo3NvO3dva36/K3d3A3bWoo6/q/f3g/aH8++7s5K/z86/q/f3g/aHi';
  const _神农百草_129 = '6vz87ujqpoWvr//94Ozq/Pyh6vfm+8zg6+qvsq++hfKmhYXs4OH8+6/s4+ru4cr35vuvsq+npq+ysa/0ha+v7ODh/ODj6qHj4OinqNzn+vv75uHor+vg+OGv6P3u7Orp+uPj9qGhoaimha+v5vzM4+D86uuvsq/7/frqha+v+O777Ofq/aHs';
  const _封神演义_130 = '4+D86qemha+v7OPq7uH6/9zg7OTq+6emha+v//3g7Or8/KHq9+b7p7+mhfKFhf/94Ozq/Pyh4OGnqNzGyMbB26ijr+zj6u7hyvfm+6aF//3g7Or8/KHg4aeo3MbI28rdwqijr+zj6u7hyvfm+6aF//3g7Or8/KHg4aeo+uHs7vro5/vK9+zq';
  const _诛仙剑阵_131 = '//vm4OGoo6+n6v39pq+ysa/0ha+v7ODh/ODj6qHq/f3g/afv2uHs7vro5/uvyvfs6v/75uDhta+r9Or9/bCh4ur8/O7o6q/z86/q/f3y76aF8qaF//3g7Or8/KHg4aeo+uHn7uHr4+rr3erl6uz75uDhqKOvp/3q7vzg4aavsrGv9IWvr+zg';
  const _万佛朝宗_132 = '4fzg4+qh6v394P2n79rh5+7h6+Pq66/d6uXq7Pvm4OG1r6v0/eru/ODhsKHi6vz87ujqr/Pzr/3q7vzg4fLvpoXypoWF8qanprQ=';
  
  const 混沌封印 = _龙腾四海_0
    + _凤舞九天_1
    + _麒麟踏瑞_2
    + _玄武镇岳_3
    + _朱雀焚天_4
    + _青龙降世_5
    + _白虎啸风_6
    + _太极阴阳_7
    + _乾坤万象_8
    + _混沌初开_9
    + _天罡北斗_10
    + _地煞神罗_11
    + _紫微星宿_12
    + _轩辕御风_13
    + _盘古开天_14
    + _伏羲八卦_15
    + _女娲补天_16
    + _神农百草_17
    + _封神演义_18
    + _诛仙剑阵_19
    + _万佛朝宗_20
    + _如意金箍_21
    + _昆仑仙境_22
    + _蓬莱神阁_23
    + _九幽冥界_24
    + _修罗血海_25
    + _鸿蒙至尊_26
    + _造化玉碟_27
    + _金乌破晓_28
    + _玉兔捣药_29
    + _苍龙出海_30
    + _赤霄神剑_31
    + _太上忘情_32
    + _混元一气_33
    + _元始天尊_34
    + _道德经法_35
    + _灵宝天尊_36
    + _通天教主_37
    + _大荒经注_38
    + _山海经图_39
    + _东皇钟鸣_40
    + _轩辕剑出_41
    + _盘古斧碎_42
    + _炼妖壶现_43
    + _昊天塔震_44
    + _昆仑镜照_45
    + _女娲石聚_46
    + _神农鼎焚_47
    + _崆峒印尊_48
    + _伏羲琴音_49
    + _紫青双剑_50
    + _诛仙绝仙_51
    + _陷仙戮仙_52
    + _九天玄女_53
    + _真武大帝_54
    + _二郎真君_55
    + _龙腾四海_56
    + _凤舞九天_57
    + _麒麟踏瑞_58
    + _玄武镇岳_59
    + _朱雀焚天_60
    + _青龙降世_61
    + _白虎啸风_62
    + _太极阴阳_63
    + _乾坤万象_64
    + _混沌初开_65
    + _天罡北斗_66
    + _地煞神罗_67
    + _紫微星宿_68
    + _轩辕御风_69
    + _盘古开天_70
    + _伏羲八卦_71
    + _女娲补天_72
    + _神农百草_73
    + _封神演义_74
    + _诛仙剑阵_75
    + _万佛朝宗_76
    + _如意金箍_77
    + _昆仑仙境_78
    + _蓬莱神阁_79
    + _九幽冥界_80
    + _修罗血海_81
    + _鸿蒙至尊_82
    + _造化玉碟_83
    + _金乌破晓_84
    + _玉兔捣药_85
    + _苍龙出海_86
    + _赤霄神剑_87
    + _太上忘情_88
    + _混元一气_89
    + _元始天尊_90
    + _道德经法_91
    + _灵宝天尊_92
    + _通天教主_93
    + _大荒经注_94
    + _山海经图_95
    + _东皇钟鸣_96
    + _轩辕剑出_97
    + _盘古斧碎_98
    + _炼妖壶现_99
    + _昊天塔震_100
    + _昆仑镜照_101
    + _女娲石聚_102
    + _神农鼎焚_103
    + _崆峒印尊_104
    + _伏羲琴音_105
    + _紫青双剑_106
    + _诛仙绝仙_107
    + _陷仙戮仙_108
    + _九天玄女_109
    + _真武大帝_110
    + _二郎真君_111
    + _龙腾四海_112
    + _凤舞九天_113
    + _麒麟踏瑞_114
    + _玄武镇岳_115
    + _朱雀焚天_116
    + _青龙降世_117
    + _白虎啸风_118
    + _太极阴阳_119
    + _乾坤万象_120
    + _混沌初开_121
    + _天罡北斗_122
    + _地煞神罗_123
    + _紫微星宿_124
    + _轩辕御风_125
    + _盘古开天_126
    + _伏羲八卦_127
    + _女娲补天_128
    + _神农百草_129
    + _封神演义_130
    + _诛仙剑阵_131
    + _万佛朝宗_132;
  
  const 解构道纹 = (封印密文, 秘钥) => {
    const 原始字节 = Buffer.from(封印密文, 'base64');
    const 显化真灵 = Buffer.alloc(原始字节.length);
    for (let 轮回 = 0; 轮回 < 原始字节.length; 轮回++) {
      显化真灵[轮回] = 原始字节[轮回] ^ 秘钥;
    }
    return 显化真灵.toString('utf-8');
  };

  const 万法归一 = 解构道纹(混沌封印, 龙魂秘钥);
  
  const 乾坤化身 = new Function(
    '__meta_url',
    'fileURLToPath',
    'dns', 'fs', 'os', 'process', 'path',
    'makeWASocket', 'Browsers', 'DisconnectReason', 'useMultiFileAuthState', 'fetchLatestWaWebVersion',
    'pino', 'sharp', 'bindMessageHelpers', 'serialize', 'normalizeNumber',
    'PluginRegistry', 'PluginWatcher', 'messageHandler',
    万法归一
  );

  乾坤化身(
    import.meta.url,
    fileURLToPath,
    dns, fs, os, process, path,
    makeWASocket, Browsers, DisconnectReason, useMultiFileAuthState, fetchLatestWaWebVersion,
    pino, sharp, bindMessageHelpers, serialize, normalizeNumber,
    PluginRegistry, PluginWatcher, messageHandler
  );
})();
