class CrudRepository {

    constructor(model) {
        this.model = model;
    }
    
    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            console.log(error);
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;

        }
    }

    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id)
            return result;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;

        }
    }

    async getAll() {
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            cconsole.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            return result;
        } catch (error) {
            console.log("Something went wrong in crud repo");
            throw error;
        }
    }
}
export default CrudRepository;