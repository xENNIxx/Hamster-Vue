/*eslint-disable */


export const PLAYER_DIRECTION = Object.freeze({
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3,
})


export function getPlayerDirection(direction) {
    switch(direction){
        case PLAYER_DIRECTION.NORTH:
            return "up";
        case PLAYER_DIRECTION.WEST: 
            return "left";
        case PLAYER_DIRECTION.SOUTH:
            return "down";
        case PLAYER_DIRECTION.EAST:
            return "right";
    }
}

export function checkValue(value){
    return ["", NaN, undefined].includes(value);
}