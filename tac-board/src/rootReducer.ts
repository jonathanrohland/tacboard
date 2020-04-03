export enum Color {
    RED = 'red',
    BLUE = 'blue',
    GREEN = 'green',
    BLACK = 'black',
}

export type FieldIndex =
    0 |
    1 |
    2 |
    3 |
    4 |
    5 |
    6 |
    7 |
    8 |
    9 |
    10 |
    11 |
    12 |
    13 |
    14 |
    15 |
    16 |
    17 |
    18 |
    19 |
    20 |
    21 |
    22 |
    23 |
    24 |
    25 |
    26 |
    27 |
    28 |
    29 |
    30 |
    31 |
    32 |
    33 |
    34 |
    35 |
    36 |
    37 |
    38 |
    39 |
    40 |
    41 |
    42 |
    43 |
    44 |
    45 |
    46 |
    47 |
    48 |
    49 |
    50 |
    51 |
    52 |
    53 |
    54 |
    55 |
    56 |
    57 |
    58 |
    59 |
    60 |
    61 |
    62 |
    63 |
    64 |
    65 |
    66 |
    67 |
    68 |
    69 |
    70 |
    71 |
    72 |
    73 |
    74 |
    75 |
    76 |
    77 |
    78 |
    79

export type State = {
    marblePositions?: { [key in FieldIndex]?: Color; }
};

// {
//     marblePositions: {
//         0?: Color;
//         1?: Color;
//         2?: Color;
//         3?: Color;
//         4?: Color;
//         5?: Color;
//         6?: Color;
//         7?: Color;
//         8?: Color;
//         9?: Color;
//         10?: Color;
//         11?: Color;
//         12?: Color;
//         13?: Color;
//         14?: Color;
//         15?: Color;
//         16?: Color;
//         17?: Color;
//         18?: Color;
//         19?: Color;
//         20?: Color;
//         21?: Color;
//         22?: Color;
//         23?: Color;
//         24?: Color;
//         25?: Color;
//         26?: Color;
//         27?: Color;
//         28?: Color;
//         29?: Color;
//         30?: Color;
//         31?: Color;
//         32?: Color;
//         33?: Color;
//         34?: Color;
//         35?: Color;
//         36?: Color;
//         37?: Color;
//         38?: Color;
//         39?: Color;
//         40?: Color;
//         41?: Color;
//         42?: Color;
//         43?: Color;
//         44?: Color;
//         45?: Color;
//         46?: Color;
//         47?: Color;
//         48?: Color;
//         49?: Color;
//         50?: Color;
//         51?: Color;
//         52?: Color;
//         53?: Color;
//         54?: Color;
//         55?: Color;
//         56?: Color;
//         57?: Color;
//         58?: Color;
//         59?: Color;
//         60?: Color;
//         61?: Color;
//         62?: Color;
//         63?: Color;
//         64?: Color;
//         65?: Color;
//         66?: Color;
//         67?: Color;
//         68?: Color;
//         69?: Color;
//         70?: Color;
//         71?: Color;
//         72?: Color;
//         73?: Color;
//         74?: Color;
//         75?: Color;
//         76?: Color;
//         77?: Color;
//         78?: Color;
//         79?: Color;
//     }
// }

export const initialState: State = {
    marblePositions: {
        3: Color.RED
    }
}

export function rootReducer(state: State | undefined, action: any): State {
    if (typeof state === 'undefined') {
        return initialState;
    }

    // For now, don't handle any actions
    // and just return the state given to us.
    return state;
}

export default rootReducer;