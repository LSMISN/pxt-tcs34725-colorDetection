/*!
* This is TCS34725 color sensor user control function
* typeScript adaptation of DFRobot Arduino's code for MakeCode.microbit.org
* @author [oe](proflsmisn@gmail.com) 
* @version  V1.0
* @date 2020-03-12
* 
* ORIGINAL CODE COME FROM
* @copyright	[DFRobot](http://www.dfrobot.com), 2016
* @copyright	GNU Lesser General Public License
*
* @author [carl](carl.xu@dfrobot.com)
* @version  V1.0
* @date  2016-07-12
*/
//% weight=10 color=#DF6721 icon="\uf1fb" block="TCS34725_COLOR_DETECTOR"
namespace TCS34725 {

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

    export enum tcs34725IntegrationTime_t {
        //% block="2.4ms"
        IT_2_4MS = 0xFF,   ///<  2.4ms - 1 cycle    - Max Count: 1024  
        //% block="24ms"
        IT_24MS = 0xF6,   ///<  24ms  - 10 cycles  - Max Count: 10240 
        //% block="50ms"
        IT_50MS = 0xEB,   ///<  50ms  - 20 cycles  - Max Count: 20480 
        //% block="101ms"
        IT_101MS = 0xD5,   ///<  101ms - 42 cycles  - Max Count: 43008 
        //% block="154ms"
        IT_154MS = 0xC0,   ///<  154ms - 64 cycles  - Max Count: 65535 
        //% block="700ms"
        IT_700MS = 0x00    ///<  700ms - 256 cycles - Max Count: 65535 
    }

    export enum tcs34725Gain_t {
        //% block="GAIN_1X "
        GAIN_1X = 0x00,   ///<  No gain  
        //% block="GAIN_4X "
        GAIN_4X = 0x01,   ///<  4x gain  
        //% block="GAIN_16X "
        GAIN_16X = 0x02,   ///<  16x gain
        //% block="GAIN_60X " 
        GAIN_60X = 0x03    ///<  60x gain 
    }

    export enum Values {
        //% block="Red"
        //% block.loc.fr="Rouge"
        r = 0,
        //% block="Green"
        //% block.loc.fr="Vert"
        g = 1,
        //% block="Blue"
        //% block.loc.fr="Bleu"
        b = 2,
        //% block="Clear Light"
        //% block.loc.fr="Luminance"
        c = 3
    }

    /*!
	*  @brief Writes a register and an 8 bit value over I2C
	*  @param reg register address .
	*  @param value  data.
	*/
    function writeReg(reg: number, dat: number): void {
        let tb = pins.createBuffer(2)
        tb[0] = reg
        tb[1] = dat
        pins.i2cWriteBuffer(TCS34725_ADDRESS, tb)
    }

    /*!
	*  @brief Reads an 8 bit value over I2C
	*  @param reg register address .
	*  @return I2C  data.
	*/
    function readReg(reg: number): number {
        pins.i2cWriteNumber(TCS34725_ADDRESS, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(TCS34725_ADDRESS, NumberFormat.UInt8LE);
    }

    /*!
	*  @brief Reads an 8 bit value over I2C
	*  @param reg register address .
	*  @return I2C  data.
	*/
    function readRegWord(reg: number): number {
        pins.i2cWriteNumber(TCS34725_ADDRESS, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(TCS34725_ADDRESS, NumberFormat.UInt16LE);
    }

    let _tcs34725Initialised = false;
    let _tcs34725IntegrationTime = tcs34725IntegrationTime_t.IT_2_4MS;
    let _tcs34725Gain = tcs34725Gain_t.GAIN_1X;

    /*!
	*  @brief Enables the device
	*/
    function enable(): void {
        writeReg(TCS34725_ENABLE, TCS34725_ENABLE_PON);
        basic.pause(3);
        writeReg(TCS34725_ENABLE, TCS34725_ENABLE_PON | TCS34725_ENABLE_AEN);
    }
    /*!
	*  Disables the device (putting it in lower power sleep mode)
	*/
    function disable(): void {

        /* Turn the device off to save power */
        let reg = 0;
        reg = readReg(TCS34725_ENABLE);
        writeReg(TCS34725_ENABLE, reg & ~(TCS34725_ENABLE_PON | TCS34725_ENABLE_AEN));
    }
    /*!
	*  @brief Initializes I2C and configures the sensor (call this function beforedoing anything else).
	*  @return  0  success.
	*/
    //% block="Initialisation done"
    //% block.loc.fr="Initialisation Terminée"
    export function begin(): boolean {
        /* Make sure we're actually connected */
        let x = readReg(TCS34725_ID);
        if ((x != 0x44) && (x != 0x10)) {
            return false;
        }
        _tcs34725Initialised = true;

        /* Set default integration time and gain */
        setIntegrationTime(_tcs34725IntegrationTime);
        setGain(_tcs34725Gain);

        /* Note: by default, the device is in power down mode on bootup */
        enable();

        return true;
    }

    /**
	*  @brief Sets the integration time for the TC34725.
	*  @param it  integration time.
	**/
    //% block="integration time %it"
    //% block.loc.fr="temps d'intégration %it"
    //% it.loc.fr="temps d'intégration"
    export function setIntegrationTime(it: TCS34725.tcs34725IntegrationTime_t = tcs34725IntegrationTime_t.IT_101MS): void {
        if (!_tcs34725Initialised) begin();

        /* Update the timing register */
        writeReg(TCS34725_ATIME, it);

        /* Update value placeholders */
        _tcs34725IntegrationTime = it;
    }

    /**
	*  Adjusts the gain on the TCS34725 (adjusts the sensitivity to light)
	*  @param gain  gain
	**/
    //% block="gain %g"
    //% jsdoc.loc.fr="Permet d'ajuster la sensibilité à la lumière ambiante"
    //% g.loc.fr="gain"
    export function setGain(g: TCS34725.tcs34725Gain_t = tcs34725Gain_t.GAIN_1X) {
        if (!_tcs34725Initialised) begin();

        /* Update the timing register */
        writeReg(TCS34725_CONTROL, g);

        /* Update value placeholders */
        _tcs34725Gain = g;
    }

	/**
	*  Reads the raw red, green, blue and clear channel values
	*  @param r  red.
	*  @param g  green.
	*  @param b  blue.
	**/
    //% block="getColor %val"
    //% block.loc.fr="affiche la valeur de couleur %val"
    //% jsdoc.loc.fr="affiche la valeur du rouge, vert, bleu, ou la luminance "
    //% r.loc.fr="Rouge"
    //% g.loc.fr="Vert"
    //% b.loc.fr="Bleu"
    //% c.loc.fr="Luminance"
    export function getRGBC(val: TCS34725.Values = TCS34725.Values.c) {

        if (!_tcs34725Initialised) begin();

        let c = readRegWord(TCS34725_CDATAL);
        let r = readRegWord(TCS34725_RDATAL);
        let g = readRegWord(TCS34725_GDATAL);
        let b = readRegWord(TCS34725_BDATAL);

        /* Set a delay for the integration time */
        switch (_tcs34725IntegrationTime) {
            case tcs34725IntegrationTime_t.IT_2_4MS:
                basic.pause(3);
                break;
            case tcs34725IntegrationTime_t.IT_24MS:
                basic.pause(24);
                break;
            case tcs34725IntegrationTime_t.IT_50MS:
                basic.pause(50);
                break;
            case tcs34725IntegrationTime_t.IT_101MS:
                basic.pause(101);
                break;
            case tcs34725IntegrationTime_t.IT_154MS:
                basic.pause(154);
                break;
            case tcs34725IntegrationTime_t.IT_700MS:
                basic.pause(700);
                break;
        }
        switch (val) {
            case Values.r:
                return r
            case Values.g:
                return g;
            case Values.b:
                return b;
            default:
                return c;
        }
    }

    /**
	*  Converts the raw R/G/B values to color temperature in degrees
	*  @return  color temperature
	**/
    //% block
    //% block.loc.fr="Calcul la temperature de couleur"
    export function calculateColorTemperature(): NumberFormat.UInt16LE {
        /* RGB to XYZ correlation      */
        let X: NumberFormat.Float32LE;
        let Y: NumberFormat.Float32LE;
        let Z: NumberFormat.Float32LE;
        /* Chromaticity co-ordinates   */
        let xc: NumberFormat.Float32LE;
        let yc: NumberFormat.Float32LE;
        /* McCamy's formula            */
        let n: NumberFormat.Float32LE;
        let cct: NumberFormat.Float32LE;

        /* Get raw data with no delay */
        if (!_tcs34725Initialised) begin();

        let c = readRegWord(TCS34725_CDATAL);
        let r = readRegWord(TCS34725_RDATAL);
        let g = readRegWord(TCS34725_GDATAL);
        let b = readRegWord(TCS34725_BDATAL);

        /* 1. Map RGB values to their XYZ counterparts.    */
        /* Based on 6500K fluorescent, 3000K fluorescent   */
        /* and 60W incandescent values for a wide range.   */
        /* Note: Y = Illuminance or lux                    */
        X = (-0.14282 * r) + (1.54924 * g) + (-0.95641 * b);
        Y = (-0.32466 * r) + (1.57837 * g) + (-0.73191 * b);
        Z = (-0.68202 * r) + (0.77073 * g) + (0.56332 * b);

        /* 2. Calculate the chromaticity co-ordinates      */
        xc = (X) / (X + Y + Z);
        yc = (Y) / (X + Y + Z);

        /* 3. Use McCamy's formula to determine the CCT    */
        n = (xc - 0.3320) / (0.1858 - yc);

        /* Calculate the final CCT */
        cct = (449.0 * Math.pow(n, 3)) + (3525.0 * Math.pow(n, 2)) + (6823.3 * n) + 5520.33;

        /* Return the results in degrees Kelvin */
        return NumberFormat.UInt16LE(cct);
    }

    /** 
    *  Calculate the illuminance in Lux from  raw R/G/B
    *  @return  lux.
    */
    //% block
    //% block.loc.fr="Calcul la luminance en Lux"
    //% jdoc.loc.fr="Calcul la luminance en Lux à partir des données rouge, vert, bleu"
    export function calculateLux(): NumberFormat.UInt16LE {
        let illuminance: NumberFormat.Float32LE;

        // Get raw data without delay
        if (!_tcs34725Initialised) begin();

        let c = readRegWord(TCS34725_CDATAL);
        let r = readRegWord(TCS34725_RDATAL);
        let g = readRegWord(TCS34725_GDATAL);
        let b = readRegWord(TCS34725_BDATAL);

        /* This only uses RGB ... how can we integrate clear or calculate lux */
        /* based exclusively on clear since this might be more reliable?      */
        illuminance = (-0.32466 * r) + (1.57837 * g) + (-0.73191 * b);

        return NumberFormat.UInt16LE(illuminance);
    }
    /**
	*  Interrupts enabled and turn off the LED
	**/
    //% block="Interrupts Enable"
    //% block.loc.fr="Activer les interruptions"
    export function lock() {
        let r = readReg(TCS34725_ENABLE);
        r |= TCS34725_ENABLE_AIEN;
        writeReg(TCS34725_ENABLE, r);
    }
    /**
	*  Interrupts disabled and turn On the LED
	**/
    //% block="Interrupts Disable"
    //% block.loc.fr="Desactiver les interruptions"
    export function unlock() {
        let r = readReg(TCS34725_ENABLE);
        r &= ~TCS34725_ENABLE_AIEN;
        writeReg(TCS34725_ENABLE, r);
    }

    /**
	*  brief clear Interrupts
	**/
    //% block="Clear Interrupts"
    //% block.loc.fr="Effacer les interruptions"
    export function clear() {
        pins.i2cWriteNumber(TCS34725_ADDRESS, TCS34725_COMMAND_BIT | 0x66, NumberFormat.Int8LE)

    }
    /**
	*  set Int Limits
	*  @param l low limit
	*  @param h high limit
	**/
    //% block="Set Interruptions Limits"
    //% block.loc.fr="Définir les limites des interruptions"
    //% l.loc.fr="limite haute"
    //% h.loc.fr="limite basse"
    export function setIntLimits(low: NumberFormat.UInt16LE, high: NumberFormat.UInt16LE): void {
        writeReg(0x04, low & 0xFF);
        writeReg(0x05, low >> 8);
        writeReg(0x06, high & 0xFF);
        writeReg(0x07, high >> 8);
    }
}