
class ActionDataUtils {

    async getString(server, areaId) {
        const data = await server.base.actionData.findOneBy({id: areaId});
        if (data == null) {
            return null;
        }
        const buffer = Buffer.from(data.data, "binary");
        return buffer.toString();
    }
}

module.exports = new ActionDataUtils();