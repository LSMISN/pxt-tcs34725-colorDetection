/**
 *This is TCS34725: color sensor user control function.
 */
//% weight=10 color=#DF6721 icon="\uf013" block="DF-Driver"
namespace tcs34725 {

    const TCS34725_ADDRESS = 0x29

    const TCS34725_COMMAND_BIT = 0x80

    const TCS34725_ENABLE = 0x00
    const TCS34725_ENABLE_AIEN = 0x10    ///< RGBC Interrupt Enable 
    const TCS34725_ENABLE_WEN = 0x08    ///< Wait enable - Writing 1 activates the wait timer 
    const TCS34725_ENABLE_AEN = 0x02    ///< RGBC Enable - Writing 1 actives the ADC, 0 disables it 
    const TCS34725_ENABLE_PON = 0x01    ///< Power on - Writing 1 activates the internal oscillator, 0 disables it 
    const TCS34725_ATIME = 0x01    ///< Integration time 
    const TCS34725_WTIME = 0x03    ///< Wait time =if TCS34725_ENABLE_WEN is asserted 
    const TCS34725_WTIME_2_4MS = 0xFF    ///< WLONG0 = 2.4ms   WLONG1 = 0.029s 
    const TCS34725_WTIME_204MS = 0xAB    ///< WLONG0 = 204ms   WLONG1 = 2.45s  
    const TCS34725_WTIME_614MS = 0x00    ///< WLONG0 = 614ms   WLONG1 = 7.4s   
    const TCS34725_AILTL = 0x04    ///< Clear channel lower interrupt threshold 
    const TCS34725_AILTH = 0x05
    const TCS34725_AIHTL = 0x06    ///< Clear channel upper interrupt threshold 
    const TCS34725_AIHTH = 0x07
    const TCS34725_PERS = 0x0C    ///< Persistence register - basic SW filtering mechanism for interrupts 
    const TCS34725_PERS_NONE = 0b0000  ///< Every RGBC cycle generates an interrupt                                
    const TCS34725_PERS_1_CYCLE = 0b0001  ///< 1 clean channel value outside threshold range generates an interrupt   
    const TCS34725_PERS_2_CYCLE = 0b0010  ///< 2 clean channel values outside threshold range generates an interrupt  
    const TCS34725_PERS_3_CYCLE = 0b0011  ///< 3 clean channel values outside threshold range generates an interrupt  
    const TCS34725_PERS_5_CYCLE = 0b0100  ///< 5 clean channel values outside threshold range generates an interrupt  
    const TCS34725_PERS_10_CYCLE = 0b0101  ///< 10 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_15_CYCLE = 0b0110  ///< 15 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_20_CYCLE = 0b0111  ///< 20 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_25_CYCLE = 0b1000  ///< 25 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_30_CYCLE = 0b1001  ///< 30 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_35_CYCLE = 0b1010  ///< 35 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_40_CYCLE = 0b1011  ///< 40 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_45_CYCLE = 0b1100  ///< 45 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_50_CYCLE = 0b1101  ///< 50 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_55_CYCLE = 0b1110  ///< 55 clean channel values outside threshold range generates an interrupt 
    const TCS34725_PERS_60_CYCLE = 0b1111  ///< 60 clean channel values outside threshold range generates an interrupt 
    const TCS34725_CONFIG = 0x0D
    const TCS34725_CONFIG_WLONG = 0x02    ///< Choose between short and long =12x wait times via TCS34725_WTIME 
    const TCS34725_CONTROL = 0x0F    ///< Set the gain level for the sensor 
    const TCS34725_ID = 0x12    ///< 0x44 = TCS34721/TCS34725, 0x4D = TCS34723/TCS34727 
    const TCS34725_STATUS = 0x13
    const TCS34725_STATUS_AINT = 0x10    ///< RGBC Clean channel interrupt 
    const TCS34725_STATUS_AVALID = 0x01    ///< Indicates that the RGBC channels have completed an integration cycle 
    const TCS34725_CDATAL = 0x14    ///< Clear channel data 
    const TCS34725_CDATAH = 0x15
    const TCS34725_RDATAL = 0x16    ///< Red channel data 
    const TCS34725_RDATAH = 0x17
    const TCS34725_GDATAL = 0x18    ///< Green channel data 
    const TCS34725_GDATAH = 0x19
    const TCS34725_BDATAL = 0x1A    ///< Blue channel data 
    const TCS34725_BDATAH = 0x1B
}

function i2cWrite(addr: number, reg: number, value: number) {
    let buf = pins.createBuffer(2)
    buf[0] = reg
    buf[1] = value
    pins.i2cWriteBuffer(addr, buf)
}

function i2cCmd(addr: number, value: number) {
    let buf = pins.createBuffer(1)
    buf[0] = value
    pins.i2cWriteBuffer(addr, buf)
}

function i2cRead(addr: number, reg: number) {
    pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
    let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
    return val;
}
