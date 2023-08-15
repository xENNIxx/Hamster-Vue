
const programmCode = {
    code: "",
};

const getProgramCode = {
    code: (programmCode) => programmCode.code,
};

const mutations = {
    setCode(programmCode, value) {
        programmCode.code = value;
    }
};

export default {
    programmCode,
    getProgramCode,
    mutations
}