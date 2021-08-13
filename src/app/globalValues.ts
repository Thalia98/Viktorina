export const ERROR_FORM = {
    ERROR_REQUIRED: 'Este campo no puede estar vacío',
    ERROR_EMAIL: 'Email inválido',
    ERROR_MIN_LENGTH: 'Debe de tener un mínimo de 6 carácteres',
    ERROR_NOT_SAME: 'Las contraseñas no coinciden',
    ERROR_CORRECT_ANSWER: 'SELECCIONE UNA RESPUESTA CORRECTA',
    ERROR_DATA: 'FALTAN DATOS POR RELLENAR',
    ERROR_USERNAME_REPEAT: 'El nombre de usuario ya está en uso.'
};

export const ALERT_TEXT = {
    HEADER_REMOVE_QUESTIONNAIRE: '¡ATENCION! Está apunto de eliminar un cuestionario',
    MESSAGE_REMOVE_QUESTIONNAIRE: '¿Está seguro/a de querer eliminar el querionario "',
};

export const RESPONSES = {
    KO: 'ko',
    OK: 'ok'
}

export const TOKEN_KEY = '6hrFDATxrG9w14QY9wwnmVhLE0Wg6LIvwOwUaxz761m1JdsfsdfsdAS5xhSkw0_MQz6bpcJnrFUDwp5lPPFC157dHxbkKlDiQ9XY3ZIP8zAGCsS8ruasdasKjIaIargX';

export const CATEGORIES = [
    'Otro',
    'Informática',
    'Deporte',
    'Historia',
    'Arte',
    'Ciencia',
    'Geografía',
    'Cultura general'
];

export const LEVEL = [
    'Principiante',
    'Intermedio',
    'Difícil'
];

export const ICONS_NAME = {
    CLOSE: 'close-outline',
    CHECK: 'checkmark-outline'
};

export const TEXT_RESULT = {
    USER_NOT_FOUND: 'Usuario no encontrado',
    USER_FOUND: 'Usuario encontrado',
    USER_SEND: 'Ya ha sido enviada',
    USER_FRIEND: 'Usuario ya agregado',
};

export const STATES_CHALLENGE = {
    PENDING: 'Pendiente',
    FINALIZED: 'Finalizado'
}

export const PAGES = [
    {
        page: '/dashboard/myQuestionnaires',
        icon: 'clipboard-outline',
        title: 'Mis cuestionarios',
        isSelected: true
    },
    {
        page: '/dashboard/',
        icon: 'reader-outline',
        title: 'Todos los cuestionarios',
        isSelected: false
    },
    {
        page: '/dashboard/list-challenges',
        icon: 'bonfire-outline',
        title: 'Retos',
        isSelected: false
    }
];

