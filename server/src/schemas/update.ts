import { z } from 'zod';

const categoriasPermitidas = ['CL', 'TR', 'AC', 'CI', 'CC', null];
const tiposZonaPermitidos = ['URBANO', 'RURAL', 'N/A', null];

const UpdateSchema = z.object({
  categoria: z.enum(['CL', 'TR', 'AC', 'CI', 'CC']).nullable().optional(),
  tipozona: z.enum(['URBANO', 'RURAL', 'N/A']).nullable().optional(),
  documentos: z.array(z.string()).min(1, 'Debe seleccionar al menos un cliente')
}).refine(
  (data) => data.categoria !== undefined || data.tipozona !== undefined,
  { message: 'Se debe proporcionar al menos un campo (categoria o tipozona)' }
);

export type UpdateType = z.infer<typeof UpdateSchema>;

export function validateUpdate(data: unknown) {
  return UpdateSchema.safeParse(data);
}