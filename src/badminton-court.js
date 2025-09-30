/**
 * @copyright 2025 Anthon Pang
 * @license MIT
 *
 * @see Sport England, "Badminton: Design Guidance Note", 2011
 *
 * {@internal
 *   For the specifications, we follow Sport England's use of millimetres.
 *   Elsewhere, we revert to using imperial feet and inches.
 * }
 */

// badminton court rendered in portrait orientation, where [x, y] is relative to the top-left corner
const badmintonCourt = {
    "court": {
        "origin": [0, 0],

        // court width => 6100 mm or 20'; court length: 13400 mm or 44'
        "dimensions": [6100, 13400],

        // [x1,y1] to [x2,y2]
        "x1": 0,
        "y1": 0,
        "x2": 6100,
        "y2": 13400
    },

    "net": {
        "origin": [0, 6700],
        "dimensions": [6100, 0],
        "x1": 0,
        "y1": 6700,
        "x2": 6100,
        "y2": 6700
    },

    "courtLines": {
        // aka singles long service line, or baseline
        "back boundary line": [
            {
                "origin": [0, 0],
                "dimensions": [6100, 40],
                "x1": 0,
                "y1": 0,
                "x2": 6100,
                "y2": 40
            },
            {
                "origin": [0, 13360],
                "dimensions": [6100, 40],
                "x1": 0,
                "y1": 13360,
                "x2": 6100,
                "y2": 13400
            }
        ],
        "doubles sideline": [
            {
                "origin": [0, 0],
                "dimensions": [40, 13400],
                "x1": 0,
                "y1": 0,
                "x2": 40,
                "y2": 13400
            },
            {
                "origin": [6060, 0],
                "dimensions": [40, 13400],
                "x1": 6060,
                "y1": 0,
                "x2": 6100,
                "y2": 13400
            }
        ],
        "singles sideline": [
            {
                "origin": [460, 0],
                "dimensions": [40, 13400],
                "x1": 460,
                "y1": 0,
                "x2": 500,
                "y2": 13400
            },
            {
                "origin": [5600, 0],
                "dimensions": [40, 13400],
                "x1": 5600,
                "y1": 0,
                "x2": 5640,
                "y2": 13400
            }
        ],
        "centre line": [
            {
                "origin": [3030, 0],
                "dimensions": [40, 4720],
                "x1": 3030,
                "y1": 0,
                "x2": 3070,
                "y2": 4720
            },
            {
                "origin": [3030, 8680],
                "dimensions": [40, 4720],
                "x1": 3030,
                "y1": 8680,
                "x2": 3070,
                "y2": 13400
            }
        ],
        "doubles long service line": [
            {
                "origin": [0, 760],
                "dimensions": [6100, 40],
                "x1": 0,
                "y1": 760,
                "x2": 6100,
                "y2": 800
            },
            {
                "origin": [0, 12600],
                "dimensions": [6100, 40],
                "x1": 0,
                "y1": 12600,
                "x2": 6100,
                "y2": 12640
            }
        ],
        "short service line": [
            {
                "origin": [0, 4680],
                "dimensions": [6100, 40],
                "x1": 0,
                "y1": 4680,
                "x2": 6100,
                "y2": 4720
            },
            {
                "origin": [0, 8680],
                "dimensions": [6100, 40],
                "x1": 0,
                "y1": 8680,
                "x2": 6100,
                "y2": 8720
            }
        ]
    },

    "serviceCourts": {
        "right service court": [
            {
                "origin": [500, 800],
                "dimensions": [2530, 3880],
                "x1": 500,
                "y1": 800,
                "x2": 3030,
                "y2": 4680
            },
            {
                "origin": [3070, 8720],
                "dimensions": [2530, 3880],
                "x1": 3070,
                "y1": 8720,
                "x2": 5600,
                "y2": 12600
            }
        ],
        "left service court": [
            {
                "origin": [3070, 800],
                "dimensions": [2530, 3880],
                "x1": 3070,
                "y1": 800,
                "x2": 5600,
                "y2": 4680
            },
            {
                "origin": [500, 8720],
                "dimensions": [2530, 3880],
                "x1": 500,
                "y1": 8720,
                "x2": 3030,
                "y2": 12600
            }
        ]
    },

    "speedTest": {
        "fast": [
            {
                "origin": [500, 530],
                "dimensions": [40, 40],
                "x1": 500,
                "y1": 530,
                "x2": 540,
                "y2": 570
            },
            {
                "origin": [5560, 12830],
                "dimensions": [40, 40],
                "x1": 5560,
                "y1": 12830,
                "x2": 5600,
                "y2": 12870
            }
        ],
        "slow": [
            {
                "origin": [500, 950],
                "dimensions": [40, 40],
                "x1": 500,
                "y1": 950,
                "x2": 540,
                "y2": 990
            },
            {
                "origin": [5560, 12410],
                "dimensions": [40, 40],
                "x1": 5560,
                "y1": 12410,
                "x2": 5600,
                "y2": 12450
            }
        ]
    }
};
