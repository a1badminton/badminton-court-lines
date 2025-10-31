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
        "x": 0,
        "y": 0,
        // court width => 6100 mm or 20'; court length: 13400 mm or 44'
        "w": 6100,
        "h": 13400
    },

    "net": {
        "x": 0,
        "y": 6700,
        "w": 6100,
        "h": 0
    },

    "courtLines": {
        // aka singles long service line, or baseline
        "back boundary line": [
            {
                "x": 0,
                "y": 0,
                "w": 6100,
                "h": 40
            },
            {
                "x": 0,
                "y": 13360,
                "w": 6100,
                "h": 40
            }
        ],
        "doubles sideline": [
            {
                "x": 0,
                "y": 0,
                "w": 40,
                "h": 13400
            },
            {
                "x": 6060,
                "y": 0,
                "w": 40,
                "h": 13400
            }
        ],
        "singles sideline": [
            {
                "x": 460,
                "y": 0,
                "w": 40,
                "h": 13400
            },
            {
                "x": 5600,
                "y": 0,
                "w": 40,
                "h": 13400
            }
        ],
        "centre line": [
            {
                "x": 3030,
                "y": 0,
                "w": 40,
                "h": 4720
            },
            {
                "x": 3030,
                "y": 8680,
                "w": 40,
                "h": 4720
            }
        ],
        "doubles long service line": [
            {
                "x": 0,
                "y": 760,
                "w": 6100,
                "h": 40
            },
            {
                "x": 0,
                "y": 12600,
                "w": 6100,
                "h": 40
            }
        ],
        "short service line": [
            {
                "x": 0,
                "y": 4680,
                "w": 6100,
                "h": 40
            },
            {
                "x": 0,
                "y": 8680,
                "w": 6100,
                "h": 40
            }
        ]
    },

    // excludes the side and back alleys
    "serviceCourts": {
        "right service court": [
            {
                "x": 500,
                "y": 800,
                "w": 2530,
                "h": 3880
            },
            {
                "x": 3070,
                "y": 8720,
                "w": 2530,
                "h": 3880
            }
        ],
        "left service court": [
            {
                "x": 3070,
                "y": 800,
                "w": 2530,
                "h": 3880
            },
            {
                "x": 500,
                "y": 8720,
                "w": 2530,
                "h": 3880
            }
        ]
    },

    // markers used to determine if a shuttlecock has the correct flight speed
    "speedTest": {
        "fast": [
            {
                "x": 500,
                "y": 530,
                "w": 40,
                "h": 40
            },
            {
                "x": 5560,
                "y": 12830,
                "w": 40,
                "h": 40
            }
        ],
        "slow": [
            {
                "x": 500,
                "y": 950,
                "w": 40,
                "h": 40
            },
            {
                "x": 5560,
                "y": 12410,
                "w": 40,
                "h": 40
            }
        ]
    }
};
