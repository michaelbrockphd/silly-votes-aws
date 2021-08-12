// Small generator to create 
const tempIdGenerator = (
    function*() {
        let id = -1;

        while( true ) {
            yield id;

            --id;
        }
    }
)();

const getIdGenerator = () => {
    return tempIdGenerator;
};

export {
    getIdGenerator
};
