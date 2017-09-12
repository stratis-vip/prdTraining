const enum sex {
    SEX_UNDEFINED = 0,
    SEX_MALE,
    SEX_FEMALE
}

const enum activitiesTypes {
    Generic = 0,
    Running = 1,
    Cycling = 2,
    Transition = 3,
    FitnessEquipment = 4,
    Swimming = 5,
    Walking = 6,
    Sedentary = 8,
    All = 254,
    Invalid = 0xFF
}

const enum activitiesSubTypes{
    Generic = 0,
    Treadmill = 1,
    Street = 2,
    Trail = 3,
    Track = 4,
    Spin = 5,
    IndoorCycling = 6,
    Road = 7,
    Mountain = 8,
    Downhill = 9,
    Recumbent = 10,
    Cyclocross = 11,
    HandCycling = 12,
    TrackCycling = 13,
    IndoorRowing = 14,
    Elliptical = 15,
    StairClimbing = 16,
    LapSwimming = 17,
    OpenWater = 18,
    All = 254,
    Invalid = 0xFF
}
export {sex,activitiesTypes, activitiesSubTypes};