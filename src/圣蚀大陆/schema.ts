export const Schema = z.object({
  角色: z.object({
    好感度: z.record(z.string(), z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(50)),
    服从度: z.record(z.string(), z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0)),
    堕落度: z.record(z.string(), z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0)),
    契约阶段: z.record(z.string(), z.string().prefault('无')),
  }).prefault({}),
  世界: z.object({
    当前区域: z.string().prefault('晨露镇'),
    魔宫层数: z.coerce.number().transform(v => _.clamp(v, 0, 20)).prefault(0),
    时间: z.string().prefault('白天'),
    nsfw模式: z.enum(['关闭', '开启']).prefault('关闭'),
    在场角色: z.array(z.string()).prefault([]),
  }).prefault({}),
  玩家: z.object({
    身份: z.string().prefault('冒险者'),
    阵营偏向: z.string().prefault('中立'),
    魔力同步率: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    当前主角: z.enum(['卡贝尔', '奥露菲', '妲克妮丝', '菲莉', '艾米丽雅', '海伦娜']).prefault('卡贝尔'),
  }).prefault({}),
  剧情: z.object({
    阶段: z.string().prefault('开场'),
    关键事件: z.record(z.string(), z.boolean().prefault(false)),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
