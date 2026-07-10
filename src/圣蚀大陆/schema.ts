export const Schema = z.object({
  世界: z.object({
    当前主角: z.enum(['卡贝尔', '奥露菲', '妲克妮丝', '菲莉', '艾米丽雅', '海伦娜']).prefault('卡贝尔'),
    当前区域: z.string().prefault('晨露镇'),
    当前楼层: z.coerce.number().prefault(0),
    时间: z.object({
      年: z.coerce.number().prefault(1024),
      月: z.coerce.number().transform(v => _.clamp(v, 1, 12)).prefault(3),
      日: z.coerce.number().transform(v => _.clamp(v, 1, 30)).prefault(15),
      时: z.coerce.number().transform(v => _.clamp(v, 0, 23)).prefault(22),
    }).prefault({}),
    nsfw模式: z.enum(['关闭', '开启']).prefault('关闭'),
    在场角色: z.array(z.string()).prefault([]),
  }).prefault({}),
  玩家: z.object({
    当前扮演主角: z.enum(['卡贝尔', '奥露菲', '妲克妮丝', '菲莉', '艾米丽雅', '海伦娜']).prefault('卡贝尔'),
    身份: z.string().prefault('魔王'),
    阵营偏向: z.string().prefault('混沌邪恶'),
    魔力同步率: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
  }).prefault({}),
  角色: z.record(z.string(), z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(50),
    服从度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    堕落度: z.coerce.number().transform(v => _.clamp(v, 0, 100)).prefault(0),
    契约阶段: z.string().prefault('无'),
  }).prefault({
    好感度: 50,
    服从度: 0,
    堕落度: 0,
    契约阶段: '无',
  })).prefault({}),
  剧情: z.object({
    阶段: z.string().prefault('开场'),
    关键事件: z.record(z.string(), z.boolean()).prefault({}),
  }).prefault({}),
});
export type Schema = z.output<typeof Schema>;
