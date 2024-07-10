using Common.Exceptions;

namespace Common.Validations
{
    public class NullEntityValidator
    {
        public NullEntityValidator()
        {

        }

        public void Validate<T>(T entity, string type)
        {
            if(entity == null)
            {  
                throw new ValidationException($"La entidad de tipo: {type} seleccionada no puede ser nula.");
            }
        }

        public void ValidateById<T>(T entity, string type)
        {
            if (entity == null)
            {
                throw new ValidationException($"La entidad de tipo: {type} no existe para el id seleccionado.");
            }
        }
    }
}
