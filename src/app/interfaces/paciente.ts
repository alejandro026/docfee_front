export class Paciente {
    id?: string;
    nombre: string;
    nss: string;
    sexo: string;
    edad: string;
    consultorio: string;
    turno: string;
    correo: string;
    telefono: string;
    ocupacion: string;
    motivo: string;
    medicam: string;
    especif: string;
    otros: string;
    alcohol: string;
    tabaquismo: string;
    drogas: string;
    inmun: string;
    otros2: string;
    especif2: string;
    menarq: string;
    ritmo: string;
    fum: string;
    g: string;
    p: string;
    a: string;
    c: string;
    ivsa: string;
    cuales: string;
    peea: string;
    ipas: string;
    ta: string;
    fc: string;
    fr: string;
    temp: string;
    peso: string;
    talla: string;
    imc: string;
    aspecto: string;
    cabeza: string;
    torax: string;
    abdomen: string;
    extrem: string;
    neuro: string;
    lab: string;
    imagen: string;
    otros3: string;
    diagnostico: string;
    tratamiento: string;

    constructor(
        nombre: string,
        nss: string,
        _sexo: string,
        _edad: string,
        _consultorio: string,
        _turno: string,
        _correo: string,
        _telefono: string,
        _ocupacion: string,
        _motivo: string,
        _medicam: string,
        _especif: string,
        _otros: string,
        _alcohol: string,
        _tabaquismo: string,
        _drogas: string,
        _inmun: string,
        _otros2: string,
        _especif2: string,
        _menarq: string,
        _ritmo: string,
        _fum: string,
        _g: string,
        _p: string,
        _a: string,
        _c: string,
        _ivsa: string,
        _cuales: string,
        _peea: string,
        _ipas: string,
        _ta: string,
        _fc: string,
        _fr: string,
        _temp: string,
        _peso: string,
        _talla: string,
        _imc: string,
        _aspecto: string,
        _cabeza: string,
        _torax: string,
        _abdomen: string,
        _extrem: string,
        _neuro: string,
        _lab: string,
        _imagen: string,
        _otros3: string,
        _diagnostico: string,
        _tratamiento: string,
        ) {
        this.nombre = nombre;
        this.nss = nss;
        this.sexo = _sexo;
        this.edad = _edad;
        this.consultorio = _consultorio;
        this.turno = _turno;
        this.correo = _correo;
        this.telefono = _telefono;
        this.ocupacion = _ocupacion;
        this.motivo = _motivo;
        this.medicam = _medicam;
        this.especif = _especif;
        this.otros = _otros;
        this.alcohol = _alcohol;
        this.tabaquismo = _tabaquismo;
        this.drogas = _drogas;
        this.inmun = _inmun;
        this.otros2 = _otros2;
        this.especif2 = _especif2;
        this.menarq = _menarq;
        this.ritmo = _ritmo;
        this.fum = _fum;
        this.g = _g;
        this.p = _p;
        this.a = _a;
        this.c = _c;
        this.ivsa = _ivsa;
        this.cuales = _cuales;
        this.peea = _peea;
        this.ipas = _ipas;
        this.ta = _ta;
        this.fc = _fc;
        this.fr = _fr;
        this.temp = _temp;
        this.peso = _peso;
        this.talla = _talla;
        this.imc = _imc;
        this.aspecto = _aspecto;
        this.cabeza = _cabeza;
        this.torax = _torax;
        this.abdomen = _abdomen;
        this.extrem = _extrem;
        this.neuro = _neuro;
        this.lab = _lab;
        this.imagen = _imagen;
        this.otros3 = _otros3;
        this.diagnostico = _diagnostico;
        this.tratamiento = _tratamiento;
    }
}