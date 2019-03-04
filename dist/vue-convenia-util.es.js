import dayjs from 'dayjs-ext';
import customParseFormat from 'dayjs-ext/plugin/customParseFormat';
import normalize, { normalizeDiacritics } from 'normalize-text';
import dayjs$1 from 'dayjs';

/**
 * @param {Number} ms - The time in miliseconds.
 * @returns {String} -
 */



/**
 * Obtém o formato da data ou null se não for possível identificar.
 * @example ```
 * ('2000-21-12') => ['YYYY-DD-MM', 'YYYY-MM-DD HH:mm:ss']
 * ('21-12-2000') => ['DD-MM-YYYY', 'DD-MM-YYYY HH:mm:ss']
 * ('21/12/2000 23:59:18') => ['DD/MM/YYYY', 'DD/MM/YYYY HH:mm:ss']
 * ('2000/12/21') => null
 * ```
 * @param {String} date
 * @returns {String}
 */
var getDateFormat = function (date) {
  var isValid = is(date, 'String') && date.trim().length >= 10;
  var format = !isValid ? null
    : /^\d{4}-\d{2}-\d{2}/.test(date) ? ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']
    : /^\d{2}-\d{2}-\d{4}/.test(date) ? ['DD-MM-YYYY', 'DD-MM-YYYY HH:mm:ss']
    : /^\d{2}\/\d{2}\/\d{4}/.test(date) ? ['DD/MM/YYYY', 'DD/MM/YYYY HH:mm:ss']
    : null;

  return format
};

/**
 * Obtém o construtor do valor.
 * @param {*} value
 * @returns {String}
 */


/**
 * Usando um valor inicial, encadeia uma função e retorna seu resultado.
 * @param {A} initial
 * @param {function(A):function} callback
 * @param {Array.<*>} params
 * @returns {B}
 * @template A, B
 */

var DELIMITER = '.';

/**
 * Spreads path into fields list.
 * @param {string} path
 * @returns {Array.<string>}
 */
var getProperties = function (path) { return is(path, 'String') ? path.split(DELIMITER) : []; };

/**
 * Deep object.
 * @typedef {Object.<string, (number|boolean|string|Deep)>} Deep
 */

/**
 * Checks if a propety is reachable.
 * @param {Deep} object
 * @param {string} property
 * @returns {(number|boolean|string|null)}
 */
var getValue = function (object, property) {
  var isReachable = is(object, 'Object') && object.hasOwnProperty(property);
  var value = isReachable ? object[property] : null;
  return value
};

/**
 * Get value from object path.
 * @param {Deep} object
 * @param {(string|Array.<string>)} path
 * @returns {(number|boolean|string|null)}
 */
var get = function (object, path) {
  var properties = getProperties(path);
  var value = properties.reduce(getValue, object);
  return value
};


/**
 * Get value from first object.
 * @param {string} name
 * @param {Deep[]} objects
 * @param {function(*):boolean} [validate]
 * @returns {*}
 */
var getProperty = function (name, objects, validate) {
  if ( validate === void 0 ) validate = defaultValidator;

  var properties = objects.map(function (object) { return get(object, name); });
  var property = properties.find(function (property) { return validate(property); });
  return property
};

/**
 * @param {String} value -
 * @returns {String} -
 */



/**
 * Faz em forma de corrente o replace do texto usando os argumentos
 * especificados.
 *
 * @param {String} text
 * @param {Array.<*>} args
 * @returns {String}
 */
var replace = function (text, args) { return chain(text, function (text) { return text.replace; }, args); };


/**
 * @param {Object} entyty -
 * @param {Array<string>} props -
 * @returns {String} -
 */



/**
 * @param {String} word -
 * @param {Array<string>} words -
 * @returns {Booloean} -
 */



/**
 * @param {Array} list -
 * @param {String} strings -
 * @param {Arrat} keys -
 * @returns {Boolean} -
 */

dayjs$1.extend(customParseFormat);

/**
 * Check value's constructor name.
 * @param {*} value
 * @param {string} constructor
 * @returns {boolean}
 */

var is = function (value, constructor) {
  return Object.prototype.toString.call(value) === ("[object " + constructor + "]")
};


/**
 * Creates a validator function that checks is value is included in values.
 * @param {Array} values
 * @returns {function(*):boolean}
 */
var includes = function (values) { return function (value) { return values.includes(value); }; };


/**
 * Checks if value is an alignment.
 */
var ALIGNMENTS = ['right', 'left', 'center'];
var isAlignment = includes(ALIGNMENTS);


/**
 * Checks if value is a list of objects.
 * @param {*} value
 * @returns {boolean}
 */
var isContent = function (value) {
  var isObject = function (value) { return is(value, 'Object'); };
  var isContent = is(value, 'Array') && value.every(isObject);
  return isContent
};


/**
 *
 */
var isCPF = function (cpf) {
  var isInvalid = function (cpf, rest, pos) { return rest !== parseInt(cpf.substring(pos, pos + 1)); };

  var sumDigit = function (cpf, digit) { return 11 - (cpf.substring(0, digit).split('').reduce(function (acc, curr, index) {
    acc += parseInt(curr) * ((digit + 1) - index);
    return acc
  }, 0) % 11); };

  var getRest = function (sum) { return sum > 9 ? 0 : sum; };

  if (!is(cpf, 'String')) { return false }

  cpf = cpf.replace(/[\D]/gi, '');

  if (!cpf.match(/^\d+$/)) { return false }

  if (cpf === '00000000000' || cpf.length !== 11) { return false }

  if (isInvalid(cpf, getRest(sumDigit(cpf, 9)), 9)) { return false }

  if (isInvalid(cpf, getRest(sumDigit(cpf, 10)), 10)) { return false }

  return true
};


/**
 * Valida se é uma data com o formato especificado ou, quando não especificado,
 * valida se é um dos formatos 'DD/MM/YYYY', 'DD-MM-YYYY' e 'YYYY-MM-DD'.
 * @example ```
 * ('3/102/2006') => false
 * ('31/02/2006') => false
 * ('21/12/2006') => true
 * ('21/12/2006', 'YYYY-MM-DD') => false
 * ```
 * @param {String} date
 * @param {String} [format]
 * @returns {Boolean}
 */
var isDate = function (date, format) {
  if ( format === void 0 ) format = null;

  var from = format || getDateFormat(date);
  var isValid = from ? dayjs$1(date, { format: from }).isValid() : false;
  return isValid
};


/**
 * Valida se o valor é um CPNJ válido.
 * @param {String} value
 * @returns {Boolean}
 */
var isCNPJ = function (value) {
  if (!is(value, 'String')) {
    return false
  }

  var digits = value.replace(/[\D]/gi, '');

  var dig1 = 0;
  var dig2 = 0;

  var validation = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  var digito = parseInt(digits.charAt(12) + digits.charAt(13));

  var getRest = function (dig) { return (((dig % 11) < 2) ? 0 : (11 - (dig % 11))); };

  validation.map(function (v, i) {
    dig1 += (i > 0 ? (digits.charAt(i - 1) * v) : 0);
    dig2 += digits.charAt(i) * v;
  });

  dig1 = getRest(dig1);
  dig2 = getRest(dig2);

  return (((dig1 * 10) + dig2) === digito)
};


/**
 * Valida, de forma simples*, se o valor é um email válido.
 * @param {String} value
 * @returns {Boolean}
 */
var isEmail = function (value) {
  var isValid = is(value, 'String') && /^.+@.+\..+$/.test(value);
  return isValid
};


/**
 * Checks if value is not null
 * @param {*} value
 * @returns {boolean}
 */
var defaultValidator = function (value) { return !is(value, 'Null'); };


var validate = Object.freeze({
	is: is,
	isAlignment: isAlignment,
	isContent: isContent,
	isCPF: isCPF,
	isDate: isDate,
	isCNPJ: isCNPJ,
	isEmail: isEmail,
	defaultValidator: defaultValidator
});

dayjs.extend(customParseFormat);

/**
 * Transforma um valor para a formatação de CPF.
 * @example ```
 * ('00000000000') => '000.000.000-00'
 * ('12345678') => '123.456.78'
 * ('Abacaxi') => null
 * ```
 * @param {String} cpf
 * @returns {String}
 */
var toCPF = function (cpf) {
  var isValid = is(cpf, 'String');
  var formatted = !isValid ? null : replace(cpf, [
    [/\D/g, ''],
    [/(\d{3})(\d)/, '$1.$2'],
    [/(\d{3})(\d)/, '$1.$2'],
    [/(\d{3})(\d{1,2})$/, '$1-$2']
  ]);
  return formatted
};

/**
 * Transforma um valor para a formatação de RG.
 * @example ```
 * ('000000000') => '00.000.000-0'
 * ('12345678') => '123.456.78'
 * ('Abacaxi') => null
 * ```
 * @param {String} rg
 * @returns {String}
 */
var toRG = function (rg) {
  var isValid = is(rg, 'String');
  var formatted = !isValid ? null : replace(rg.toUpperCase(), [
    [/[^\d|A|B|X]/g, ''],
    [/(\d{2})(\d)/, '$1.$2'],
    [/(\d{3})(\d)/, '$1.$2'],
    [/(\d{3})([\d|A|B|X]{1})$/, '$1-$2']
  ]);
  return formatted
};

/**
 * Formata um valor para a formatação de moeda.
 * @example ```
 * ('1200') => 'R$ 1.200,00'
 * (15.50) => 'R$ 15,50'
 * ('Abacaxi') => null
 * ```
 * @param {String} number
 * @returns {String}
 */
var toMoney = function (number) {
  var isValid = is(number, 'Number') || (is(number, 'String') && !isNaN(number));
  var formatted = !isValid ? null : 'R$ ' + replace((+number).toFixed(2), [
    ['.', ','],
    [/(\d)(?=(\d{3})+(?!\d))/g, '$1.']
  ]);
  return formatted
};

/**
 * Obtém a quantidade de anos a partir da data.
 * @example ```
 * ('21-12-2006') => 10
 * ('2000-12-21') => 16
 * ('Abacaxi') => null
 * ```
 * @param {String} date
 * @returns {Number}
 */
var toYears = function (date) {
  var format = getDateFormat(date);
  var from = format ? dayjs(date, format) : null;
  var diff = from ? dayjs().diff(from, 'years') : null;
  var years = is(diff, 'Number') && !isNaN(diff) ? diff : null;
  return years
};

/**
 * Formata para o formato de dias.
 * @example ```
 * (2) => '2 dias'
 * (1) => '1 dia'
 * (0) => '0 dias'
 * ```
 * @param {Number} quantity
 * @returns {String}
 */
var toDays = function (quantity) {
  var isValid = is(quantity, 'Number') && Number.isFinite(quantity);
  var days = (quantity === 1) ? '1 dia' : ((isValid ? ~~(quantity) : 0) + " dias");
  return days
};

/**
 * Formata uma data 'YYYY-MM-DD' ou 'DD-MM-YYYY' em 'DD/MM/YYYY'. Transforma
 * a data em 'YYYY-MM-DD' caso o segundo parâmetro seja "true".
 * @example ```
 * ('21-12-2006') => '21/12/2006'
 * ('2006-12-21') => '21/12/2006'
 * ('21/12/2006') => '21/12/2006'
 * ('21/12/2006', true) => '2006-12-21'
 * ('2006-12-21', true) => '2006-12-21'
 * ('2006/12/21') => null
 * ```
 * @param {String} date
 * @param {{ from: String, to: String, UTC: Boolean }} [options]
 * @returns {String}
 */
var toDate = function (date, ref) {
  if ( ref === void 0 ) ref = {};
  var to = ref.to; if ( to === void 0 ) to = 'DD/MM/YYYY';
  var from = ref.from; if ( from === void 0 ) from = getDateFormat(date);
  var isUTC = ref.UTC; if ( isUTC === void 0 ) isUTC = false;

  var isValid = from && isDate(date, from);
  if (!isValid) {
    return null
  }

  var formatted = isUTC
    ? dayjs(date,{ format: from, utc: true })
    : dayjs(date,{ format: from });

  return formatted.format(to)
};

/**
 * Usa a formatação de datas para retornar um intervalo.
 * @example ```
 * ({ start: '21-12-2006', end: '31-12-2006' }) => '21/12/2006 a 31/12/2006'
 * ```
 * @param {{ start: String, end: String }} dates
 * @param {{ from: String, to: String }} [options]
 * @returns {String}
 */
var toInterval = function (dates, options) {
  if ( options === void 0 ) options = {};

  var start = dates.start;
  var end = dates.end;
  var interval = (toDate(start, options)) + " a " + (toDate(end, options));
  return interval
};

/**
 * Faz uma verificação simples e coloca o caractere para vazio caso o valor seja
 * vazio (null, undefined, '').
 * @param {*} value
 * @param {String} char
 * @returns {String}
 */
var toEmpty = function (value, char) {
  if ( char === void 0 ) char = '-';

  return value || char;
};

/**
 * Formata um valor para o formato de telefone.
 * @param {String} value
 * @returns {String}
 */
var toPhone = function (value) {
  var isValid = is(value, 'String');
  var formatted = !isValid ? null : replace(value, [
    [/\D/g, ''],
    [/(\d{1,2})/, '($1'],
    [/(\(\d{2})(\d{1,4})/, '$1) $2'],
    [/( \d{4})(\d{1,4})/, '$1-$2'],
    [/( \d{4})(?:-)(\d{1})(\d{4})/, '$1$2-$3']
  ]);
  return formatted
};

/**
 * Formata o texto removendo seus acentos.
 * @example ```
 * ('Vítor') => 'Vitor'
 * ('Olá, tudo bem com você?') => 'Ola, tudo bem com voce?'
 * ```
 * @param {String} value
 * @returns {String}
 */
var toClean = function (value) {
  var isValid = is(value, 'String');
  var formatted = !isValid ? null : normalizeDiacritics(value);
  return formatted
};

/**
 * Formata um texto o transformando em _kebab-case_.
 * @param {String} value
 * @returns {String}
 */
var toSlug = function (value) {
  if (!is(value, 'String')) { // Short-circuit to handle all non-string values
    return null               // and return null.
  }
  var formatted = replace(normalize(value), [
    [/&/g, '-e-'],
    [/\W/g, '-'],
    [/--+/g, '-'],
    [/(^-+)|(-+$)/, '']
  ]);
  return formatted
};

/**
 * Formata um valor para CEP.
 * @param {String} value
 * @returns {Boolean}
 */
var toCEP = function (value) {
  var isValid = is(value, 'String');
  var formatted = !isValid ? null : replace(value, [
    [/\D/g, ''],
    [/(\d{5})(\d{1,3})/, '$1-$2']
  ]);
  return formatted
};


var format = Object.freeze({
	toCPF: toCPF,
	toRG: toRG,
	toMoney: toMoney,
	toYears: toYears,
	toDays: toDays,
	toDate: toDate,
	toInterval: toInterval,
	toEmpty: toEmpty,
	toPhone: toPhone,
	toClean: toClean,
	toSlug: toSlug,
	toCEP: toCEP
});

/**
 * @param {Object} -
 */
var Alignable = function (ref) {
  if ( ref === void 0 ) ref = {};
  var cols = ref.cols; if ( cols === void 0 ) cols = 'cols';

  return ({
  props: {
    align: {
      type: String,
      default: 'left',
      validator: isAlignment
    }
  },

  methods: {
    /**
     * Get column's alignment.
     * @param {number} index
     * @returns {('right'|'left'|'center')}
     */
    $getAlignment: function $getAlignment (index) {
      var col = this[cols][index];
      var alignment = getProperty('align', [col, this._props], isAlignment);
      return alignment
    }
  }
});
};

function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a);}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d);}function d(e){c(e,1);}c();})}

/**
 * Adiciona o dado isLoading com true, que assim que o componente e montado
 * e a action e executada ele passa a ser false.
 *
 * @param {function(Vue): Promise} action - Action a ser executada, recebe
 * o contexto do componente como parametro e deve retornar uma Promise.
 *
 */
var Loadable = function (action) { return ({
  data: function data () { return { isLoading: false } },

  mounted: function mounted () {return __async(function*(){
    var loaderFn = action || this.load;
    var isLoadable = is(loaderFn, 'Function');

    if (!isLoadable) { return }

    this.isLoading = true;
    yield Promise.resolve(loaderFn.call(this));
    this.isLoading = false;
  }.call(this))}
}); };

/**
 *
 */
var MediaQuery = {
  data: function data () {
    return {
      matchMedia: window.matchMedia('(max-width: 1023px)'),
      isMobile: false
    }
  },
  methods: {
    setBreakpoint: function setBreakpoint () {
      this.isMobile = this.matchMedia && this.matchMedia.matches;
    }
  },
  beforeDestroy: function beforeDestroy () {
    this.matchMedia.removeListener(this.setBreakpoint);
  },
  mounted: function mounted () {
    this.matchMedia.addListener(this.setBreakpoint);
    this.setBreakpoint();
  }
};

/**
 * Resolve o problema das propriedades não inicializadas que não poderiam ser
 * observadas.
 * @param {{}} template
 */
var ObservableFix = function (template) {
  if ( template === void 0 ) template = {};

  return ({
  props: {
    data: {
      type: Object,
      default: function () { return Object.assign({}, template); }
    }
  },
  data: function data () {
    return {
      selected: Object.assign({}, template)
    }
  },
  watch: {
    data: function data () {
      this.cloneData();
    }
  },
  methods: {
    cloneData: function cloneData () {
      this.selected = Object.assign({}, template, this.data);
    }
  },
  mounted: function mounted () {
    this.cloneData();
  }
});
};

/*
  - 'Shadowed' Vue mixin is suposed to be used together with Sass 'shadowed' sass mixin.

  - Import the Vue mixin in your component and place a ref="shadowed" in the element
    that you would like to have a shadowed scroll behavior.

  - The element must have a wrapper div (father element) for the mixin to work properly.

  - Place a @include shadowed($shadow-size) in the wrapper element (style section)
*/

var Shadowed = function (refName) {
  if ( refName === void 0 ) refName = 'shadowed';

  return ({
  data: function data () {
    return {
      upperShadow: false,
      bottomShadow: false
    }
  },

  watch: {
    upperShadow: function upperShadow (val) {
      if (val) {
        this.shadowedElement.classList.add('-upper-shadow');
      } else {
        this.shadowedElement.classList.remove('-upper-shadow');
      }
    },
    bottomShadow: function bottomShadow (val) {
      if (val) {
        this.shadowedElement.classList.add('-bottom-shadow');
      } else {
        this.shadowedElement.classList.remove('-bottom-shadow');
      }
    }
  },

  computed: {
    shadowedElement: function shadowedElement () {
      return this.$refs[refName].hasOwnProperty('$el') ?
        this.$refs[refName].$el : this.$refs[refName]
    }
  },

  methods: {
    toggleScrollShadow: function toggleScrollShadow () {
      var ref = this.shadowedElement;
      var scrollTop = ref.scrollTop;
      var scrollHeight = ref.scrollHeight;
      var clientHeight = ref.clientHeight;

      this.upperShadow = scrollTop > 0;
      this.bottomShadow = scrollHeight > (clientHeight + scrollTop);
    }
  },

  beforeUpdate: function beforeUpdate () {
    this.$nextTick(this.toggleScrollShadow);
  },

  mounted: function mounted () {
    this.$nextTick(this.toggleScrollShadow);
    window.addEventListener('resize', this.toggleScrollShadow);
    this.shadowedElement.addEventListener('scroll', this.toggleScrollShadow);
  },

  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.toggleScrollShadow);
    this.shadowedElement.removeEventListener('scroll', this.toggleScrollShadow);
  }
});
};



var mixin = Object.freeze({
	Alignable: Alignable,
	Loadable: Loadable,
	MediaQuery: MediaQuery,
	ObservableFix: ObservableFix,
	Shadowed: Shadowed
});

/**
 * Integra automaticamente as funções de validação ao vee-validade.
 * @param {vee-validate.Validator} Validator
 * @param {Object.<String, { name: String, getMessage: Function }>} options
 */
var VeeValidateIntegration = function (Validator, options) {
  var defaultOptions = {
    isCPF: {
      name: 'cpf',
      getMessage: function () { return 'CPF inválido.'; }
    },
    isCNPJ: {
      name: 'cnpj',
      getMessage: function () { return 'CNPJ inválido.'; }
    },
    isDate: {
      name: 'date',
      getMessage: function () { return 'Data inválida.'; }
    }
  };

  var rules = Object.assign({}, defaultOptions, options);

  Object.keys(rules)
    .map(function (key) { return Object.assign({}, rules[key], { validate: validate[key] }); })
    .filter(function (rule) { return is(rules, 'Object'); })
    .forEach(function (rule) { return Validator.extend(rule.name, rule); });

  return true
};

var integrations = {
  'vee-validate': VeeValidateIntegration
};

/**
 * Opções do plugin.
 * @typedef {Object} Options
 * @property {Boolean} formatters
 * @property {Boolean} formatFilters
 * @property {Boolean} validators
 */

/**
 * Adiciona as funções auxiliares definidas no protótipo do Vue, e
 * consequentemente aos componentes.
 * @param {Vue} Vue
 * @param {Options} options
 */
var install = function (Vue, options) {
  if ( options === void 0 ) options = {};

  if (options.formatters) {
    Vue.prototype.$format = format;
  }

  if (options.formatFilters) {
    Object.keys(format).forEach(function (name) {
      var handler = format[name];
      Vue.filter(name, handler);
    });
  }

  if (options.validators) {
    Vue.prototype.$validate = validate;
  }
};

/**
 * Integra-se a lib definida usando o object/função de integração e as opções da
 * integração.
 * @example ```
 * import { Validator } from 'vee-validate'
 * import Util from 'vue-convenia-util'
 *
 * Util.integrate('vee-validate', Validator)
 * ```
 * @param {String} lib
 * @param {(Object|Function)} integrator
 * @param {Object} options
 * @returns {Boolean}
 */
var integrate = function (lib, integrator, options) {
  if ( options === void 0 ) options = {};

  var integration = integrations.hasOwnProperty(lib) ? integrations[lib] : null;
  var success = integration ? integration(integrator, options) : false;
  return success
};

var index = {
  install: install,
  integrate: integrate,
  validate: validate,
  format: format,
  mixin: mixin
};

export default index;
