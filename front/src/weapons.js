
import GalilAR from './assets/galil-ar.png'
import FAMAS from './assets/famas.png'
import AK47 from './assets/ak47.png'
import M4A4 from './assets/m4a4.png'
import M4A1S from './assets/m4a1-s.png'
import AUG from './assets/aug.png'
import SG553 from './assets/sg-553.png'
import SSG08 from './assets/ssg-08.png'
import AWP from './assets/awp.png'
import SCAR20 from './assets/scar-20.png'
import G3SG1 from './assets/g3sg1.png'

import USPS from './assets/usp-s.png'
import Glock18 from './assets/glock-18.png'
import P2000 from './assets/p2000.png'
import DualBerettas from './assets/dual-berettas.png'
import P250 from './assets/p250.png'
import Tec9 from './assets/tec-9.png'
import CZ75Auto from './assets/cz75.png'
import FiveSeven from './assets/five-seven.png'
import RevolverR8 from './assets/r8-revolver.png'
import DesertEagle from './assets/desert-eagle.png'

import MAC10 from './assets/mac-10.png'
import MP7 from './assets/mp7.png'
import MP9 from './assets/mp9.png'
import MP5SD from './assets/mp5-sd.png'
import UMP45 from './assets/ump-45.png'
import P90 from './assets/p90.png'
import PPBizon from './assets/pp-bizon.png'

import Nova from './assets/nova.png'
import XM1014 from './assets/xm1014.png'
import SawedOff from './assets/sawed-off.png'
import MAG7 from './assets/mag-7.png'
import M249 from './assets/m249.png'
import Negev from './assets/negev.png'


const CounterTerroristsPistols = [
    {name: 'USP-S', image: USPS},
    {name: 'P2000', image: P2000},
]

const CounterTerroristsSMGs = [
    {name: 'MP9', image: MP9},
]

const CounterTerroristsRifles = [
    {name: 'FAMAS', image: FAMAS},
    {name: 'M4A4', image: M4A4},
    {name: 'M4A1-S', image: M4A1S},
    {name: 'AUG', image: AUG},
    {name: 'G3SG1', image: G3SG1},
]

const CounterTerroristsHeavy = [
    {name: 'MAG-7', image: MAG7},
]


const CounterTerrorists = [
    ...CounterTerroristsPistols,
    ...CounterTerroristsSMGs,
    ...CounterTerroristsRifles,
    ...CounterTerroristsHeavy
]

const TerroristsPistols = [
    {name: 'Glock-18', image: Glock18},
    {name: 'Tec-9', image: Tec9},

]

const TerroristsSMGs = [
    {name: 'MAC-10', image: MAC10},

]

const TerroristsHeavy = [
    {name: 'Sawed-Off', image: SawedOff},
]

const TerroristsRifles = [
    {name: 'Galil AR', image: GalilAR},
    {name: 'AK-47', image: AK47},
    {name: 'SSG 08', image: SSG08},
    {name: 'SCAR-20', image: SCAR20},

]

const Terrorists = [
    ...TerroristsPistols,
    ...TerroristsSMGs,
    ...TerroristsRifles,
    ...TerroristsHeavy
]

const AllPistols = [
    {name: 'Dual Berettas', image: DualBerettas},
    {name: 'P250', image: P250},
    {name: 'CZ75-Auto', image: CZ75Auto},
    {name: 'Five-SeveN', image: FiveSeven},
    {name: 'Revolver R8', image: RevolverR8},
    {name: 'Desert Eagle', image: DesertEagle}
]

const AllSMGs = [
    {name: 'MP7', image: MP7},
    {name: 'MP5-SD', image: MP5SD},
    {name: 'UMP-45', image: UMP45},
    {name: 'P90', image: P90},
    {name: 'PP-Bizon', image: PPBizon},
]

const AllRifles = [
    {name: 'SG 553', image: SG553},
    {name: 'AWP', image: AWP},

]

const AllHeavy = [
    {name: 'Nova', image: Nova},
    {name: 'XM1014', image: XM1014},
    {name: 'M249', image: M249},
    {name: 'Negev', image: Negev},
]

const All = [
    ...AllPistols,
    ...AllSMGs,
    ...AllRifles,
    ...AllHeavy
]


export const Weapons = {
    CounterTerrorists: CounterTerrorists,
    Terrorists: Terrorists,
    All: All,
}